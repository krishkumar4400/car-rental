import { userModel } from "../models/user.model.js";
import sendMail from "../services/mail.service.js";
import ApiError from "../utils/api-error.js";
import ApiResponse from "../utils/api-response.js";
import asyncHandler from "../utils/async-handler.js";
import { cookieOptions } from "../utils/cookie-options.js";

const logoutUser = asyncHandler(async (req, res, next) => {});

const verifyEmail = asyncHandler(async (req, res, next) => {});

const resendAccountVerificationMail = asyncHandler(
  async (req, res, next) => {},
);

const changeCurrentPassword = asyncHandler(async (req, res, next) => {});
const changeCurrentName = asyncHandler(async (req, res, next) => {});
const changeCurrentAddress = asyncHandler(async (req, res, next) => {});
