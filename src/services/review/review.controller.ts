import { Request, Response } from "express";
import { catchAsync } from "../../lib/catchAsync.js";
import { sendResponse } from "../../lib/sendResponse.js";
import {
  createReviewInDB,
  getReviewsByProductFromDB,
  deleteReviewFromDB,
} from "./review.service.js";

export const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await createReviewInDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Review added successfully",
    data: result,
  });
});

export const getReviewsByProduct = catchAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const result = await getReviewsByProductFromDB(productId as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reviews fetched successfully",
    data: result,
  });
});

export const deleteReview = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteReviewFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Review deleted successfully",
    data: result,
  });
});