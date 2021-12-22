import jwt from "jsonwebtoken";
import User from '../Models/User';
import ErrorResponse from '../Utils/ErrorResponse';
import asyncHandler from './AsyncHandler';

exports.protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.API_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    console.log(err);
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});
