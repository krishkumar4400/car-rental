import jwt from "jsonwebtoken";
import asyncHandler from "../utils/async-handler";
import ApiError from "../utils/api-error";

const authenticationMiddleware = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError(401, "You are not logged in");
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    req.userId = decoded.userId;
    return next();
  } catch (error) {
    throw new ApiError(401, "unauthorized", error);
  }
});

const isAuthenticated = (req, res, next) => {
  if (!req.userId) {
    throw new ApiError(401, "unauthorized");
  }
  return next();
};

export { authenticationMiddleware, isAuthenticated };
