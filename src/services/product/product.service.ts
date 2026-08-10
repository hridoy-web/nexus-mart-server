import { prisma } from "../../lib/prisma.js";

type TProductPayload = {
  title: string;
  description: string;
  price: number;
  stock: number;
  categoryId: string;
  userId: string;
};

// ১. নতুন প্রোডাক্ট তৈরি
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

// ২. সব প্রোডাক্ট দেখা (Search & Filter সহ)
export const getAllProductsFromDB = async (query: { search?: string; categoryId?: string }) => {
  const { search, categoryId } = query;

  const whereCondition: any = { isDeleted: false };

  // সার্চ লজিক (Title বা Description দিয়ে)
  if (search) {
    whereCondition.OR = [
      { title: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
    ];
  }

  // ক্যাটাগরি ফিল্টার
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

// ৩. একটি নির্দিষ্ট প্রোডাক্ট দেখা
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

// ৪. প্রোডাক্ট তথ্য আপডেট
export const updateProductInDB = async (id: string, payload: Partial<TProductPayload>) => {
  return await prisma.product.update({
    where: { id },
    data: payload,
  });
};

// ৫. প্রোডাক্ট সফট ডিলিট
export const deleteProductFromDB = async (id: string) => {
  return await prisma.product.update({
    where: { id },
    data: { isDeleted: true },
  });
};