import { Request, Response } from "express";
import { catchAsync } from "../../lib/catchAsync.js";
import { sendResponse } from "../../lib/sendResponse.js";
import {
  addToCartInDB,
  getUserCartFromDB,
  removeFromCartInDB,
  updateCartItemQuantityInDB,
} from "./cart.service.js";

export const addToCart = catchAsync(async (req: Request, res: Response) => {
  const result = await addToCartInDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Item added to cart successfully",
    data: result,
  });
});

export const getUserCart = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await getUserCartFromDB(userId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User cart fetched successfully",
    data: result,
  });
});

export const updateCartQuantity = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { quantity } = req.body;
  const result = await updateCartItemQuantityInDB(id as string, Number(quantity));

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Cart item quantity updated successfully",
    data: result,
  });
});

export const removeFromCart = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await removeFromCartInDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Item removed from cart successfully",
    data: result,
  });
});