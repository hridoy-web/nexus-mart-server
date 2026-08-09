import { Request, Response } from "express";
import { catchAsync } from "../../lib/catchAsync.js";
import { sendResponse } from "../../lib/sendResponse.js";
import {
  createCategoryInDB,
  getAllCategoriesFromDB,
  getSingleCategoryFromDB,
  updateCategoryInDB,
  deleteCategoryFromDB,
} from "./category.service.js";

export const createCategory = catchAsync(async (req: Request, res: Response) => {
  const { name } = req.body;
  const result = await createCategoryInDB(name);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

export const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await getAllCategoriesFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Categories fetched successfully",
    data: result,
  });
});

export const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await getSingleCategoryFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category fetched successfully",
    data: result,
  });
});

export const updateCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  const result = await updateCategoryInDB(id as string, name);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

export const deleteCategory = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await deleteCategoryFromDB(id as string);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Category deleted successfully",
    data: result,
  });
});