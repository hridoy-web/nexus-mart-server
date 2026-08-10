import { prisma } from "../../lib/prisma.js";

type TProductPayload = {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  userId: string;
};

// create new product
export const createProductInDB = async (payload: TProductPayload) => {
  return await prisma.product.create({
    data: payload,
    include: {
      category: {
        select: { name: true },
      },
      user: {
        select: { name: true, email: true },
      },
    },
  });
};

// Get all products with (Search & Filter)
export const getAllProductsFromDB = async (query: { search?: string; categoryId?: string }) => {
  const { search, categoryId } = query;

  const whereCondition: any = { isDeleted: false };

  // search logic (Title and Description)
  if (search) {
    whereCondition.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // category filter
  if (categoryId) {
    whereCondition.categoryId = categoryId;
  }

  return await prisma.product.findMany({
    where: whereCondition,
    include: {
      category: { select: { id: true, name: true } },
      reviews: { select: { rating: true, comment: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

// single product get
export const getSingleProductFromDB = async (id: string) => {
  return await prisma.product.findFirst({
    where: { id, isDeleted: false },
    include: {
      category: true,
      reviews: {
        include: {
          user: { select: { name: true } },
        },
      },
    },
  });
};

// products data update
export const updateProductInDB = async (id: string, payload: Partial<TProductPayload>) => {
  return await prisma.product.update({
    where: { id },
    data: payload,
  });
};

// product soft delete
export const deleteProductFromDB = async (id: string) => {
  return await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};