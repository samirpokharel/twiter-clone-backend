import asyncHandler from "../Middleware/AsyncHandler";
import ErrorResponse from '../Utils/ErrorResponse';
import User from "../Models/User";
import { tokenResponse } from "../Utils/ResponseUtil";

/**
 * @title Create Account
 * @route POST /api/v1/user/create-user
 * @description create account with email and password
 */
exports.create_account = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);
  return tokenResponse(user, 200, res);
});

/**
 * @title Login Account
 * @route POST /api/v1/user/login-account
 * @description login in the with email and password
 */
exports.login_account = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new ErrorResponse("Provide an User and password", 400));
  }
  const user = await User.findOne({
    $or: [{ username: req.body.logUsername }, { email: req.body.logUsername }],
  }).select("+password");
  if (!user) {
    return next(new ErrorResponse("User not found", 401));
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials", 401));
  }
  return tokenResponse(user, 200, res);
});

/**
 * @title Current Account
 * @route GET /api/v1/user/current-account
 * @description returns the currently loged account
 */
exports.current_account = asyncHandler(async (req, res, next) => {
  //TODO: implement
});

/**
 * @title Update Account
 * @route PUT /api/v1/user/update-account
 * @description update account
 */
exports.update_account = asyncHandler(async (req, res, next) => {
  //TODO: implement
});

/**
 * @title Conform Account
 * @route GET /api/v1/user/conform-account
 * @description conform email address
 */

exports.conform_account = asyncHandler(async (req, res, next) => {
  //TODO: implement
});

/**
 * @title Forgot Account Password
 * @route POST /api/v1/user/forgot-account-password
 * @description end point for password forgot
 */
exports.forgot_account_password = asyncHandler(async (req, res, next) => {
  //TODO: implement
});

/**
 * @title Reset Account Password
 * @route PUT /api/v1/user/reset-account-password
 * @description end point for password reset
 */
exports.reset_account_password = asyncHandler(async (req, res, next) => {
  //TODO: implement
});
