import { Request, Response } from "express";
import { catchAsync } from "../../lib/catchAsync.js";
import { sendResponse } from "../../lib/sendResponse.js";
import { createOrderInDB, getUserOrdersFromDB } from "./order.service.js";

export const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { userId, totalAmount } = req.body;

  const result = await createOrderInDB({
    userId,
    totalAmount: Number(totalAmount),
  });

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Order placed successfully",
    data: result,
  });
});

export const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await getUserOrdersFromDB(userId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Orders fetched successfully",
    data: result,
  });
});