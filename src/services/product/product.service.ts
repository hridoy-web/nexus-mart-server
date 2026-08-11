import { prisma } from "../../lib/prisma.js";

type TProductPayload = {
  title: string;
  description: string;
  price: number;
  stock: number;
  image?: string; // image URL
  categoryId: string;
  userId: string;
};

// create new product
export const createProductInDB = async (payload: any) => {
  const { categoryId, userId, ...productData } = payload;

  return await prisma.product.create({
    data: {
      ...productData,
      categoryId,
      userId
    },
  });
};

// Get all products with (Search & Filter)
export const getAllProductsFromDB = async (query: {
  search?: string;
  categoryId?: string;
  limit?: string;
  page?: string;
}) => {
  const { search, categoryId, limit, page } = query;

  const whereCondition: any = { isDeleted: false };

  // Search filter
  if (search) {
    whereCondition.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // Category filter
  if (categoryId) {
    whereCondition.categoryId = categoryId;
  }

  // Pagination & Limit calculation
  const take = limit ? parseInt(limit) : undefined;
  const skip = limit && page ? (parseInt(page) - 1) * take! : undefined;

  return await prisma.product.findMany({
    where: whereCondition,
    take,
    skip,
    include: {
      category: { select: { id: true, name: true } },
      reviews: { select: { rating: true, comment: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

// Get latest 12 products for home page
export const getHomeProductsFromDB = async () => {
  return await prisma.product.findMany({
    where: { isDeleted: false },
    take: 12,
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
  const existingProduct = await prisma.product.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existingProduct) {
    throw new Error("Product not found or has been deleted!");
  }

  return await prisma.product.update({
    where: { id },
    data: payload,
  });
};

// product soft delete
export const deleteProductFromDB = async (id: string) => {
  const existingProduct = await prisma.product.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existingProduct) {
    throw new Error("Product not found or already deleted!");
  }

  return await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};