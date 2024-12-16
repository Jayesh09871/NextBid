import { User } from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "./error.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { AppConfig } from "../config/env.config.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("Authorization header missing or malformed.");
    return next(new ErrorHandler("User not Authenticated.", 400));
  }

  const token = authHeader.split(" ")[1];
  console.log("Token received:", token);

  const decoded = jwt.verify(token, AppConfig.JWT_SECRET_KEY);
  console.log("Decoded token:", decoded);

  req.user = await User.findById(decoded.id);
  console.log("Authenticated user:", req.user);

  next();
});



export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resouce.`,
          403
        )
      );
    }
    next();
  };
};
