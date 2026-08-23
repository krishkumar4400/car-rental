import { userModel } from "../models/user.model.js";
import sendMail from "../services/mail.service.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import { cookieOptions } from "../utils/cookie-options.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await userModel.findById(userId);

  const accessToken = user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  return {
    accessToken,
    refreshToken,
  };
};

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, phone, password, firstName, lastName, role } = req.body;

  // check if user already exists with the email user trying to register
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  // check if phone number already exists
  if (existingUser.phone === phone) {
    throw new ApiError(409, "phone number already exists");
  }

  // create a new user inside database
  const user = await userModel.create({
    email,
    passwordHash: password,
    phone,
    role,
    profile: { firstName, lastName },
  });

  // send account verification mail
  const { unHashedToken, hashedToken, tokenExpiry } =
    await user.generateTemporaryToken();

  user.verification = {
    emailVerificationToken: hashedToken,
    emailVerificationTokenExpiry: tokenExpiry,
  };

  await user.save({ validateBeforeSave: false });

  const html = `<div>
        <h1>
            Account verification Mail
        </h1>
        <div>
            <p><a href=http://localhost:4000/api/v1/auth/verify-email/${unHashedToken}>click here</a> to verify you account</p>
            
        </div>
    </div>
  `;
  await sendMail({ to: email, subject: "Account Verification", html });

  // send response back to user
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id,
  );

  const response = {
    message: "User registered successfully",
    success: true,
    status: "CREATED",
    user: {
      userId: user._id,
      email: user.email,
      accessToken,
      refreshToken,
      role: user.role,
    },
  };

  return res
    .status(201)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(201, response, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "incorrect email or password");
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    throw new ApiError(401, "incorrect email or password");
  }

  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id);

  const response = {
    message: "User logged in successfully",
    success: true,
    status: "OK",
    user: {
      userId: user._id,
      email: user.email,
      accessToken,
      refreshToken,
      role: user.role,
    },
  };
  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(new ApiResponse(200, response, "User logged in successfully"));
});

const sendForgotPasswordMail = asyncHandler(async (req, res, next) => {});

const resetPassword = asyncHandler(async (req, res, next) => {});

