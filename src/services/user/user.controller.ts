import { Request, Response } from "express";
import { catchAsync } from "../../lib/catchAsync.js";
import { sendResponse } from "../../lib/sendResponse.js";
import { registerUserIntoDB, loginUserFromDB } from "./user.service.js";

export const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User logged in successfully",
    data: result,
  });
});