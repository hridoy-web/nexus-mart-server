import { prisma } from "../../lib/prisma.js";

type TReviewPayload = {
  rating: number;
  comment: string;
  productId: string;
  userId: string;
};

// review create
export const createReviewInDB = async (payload: TReviewPayload) => {
  return await prisma.review.create({
    data: payload,
    include: {
      user: { select: { name: true } },
      product: { select: { title: true } },
    },
  });
};

// specific review get
export const getReviewsByProductFromDB = async (productId: string) => {
  return await prisma.review.findMany({
    where: { productId, isDeleted: false },
    include: {
      user: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

// review (Soft Delete)
export const deleteReviewFromDB = async (id: string) => {
  return await prisma.review.update({
    where: { id },
    data: { isDeleted: true },
  });
};