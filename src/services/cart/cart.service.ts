import { prisma } from "../../lib/prisma.js";

type TCartItemPayload = {
  userId: string;
  productId: string;
  quantity: number;
};

// cart item add and update
export const addToCartInDB = async (payload: TCartItemPayload) => {
  const { userId, productId, quantity } = payload;

  const existingCartItem = await prisma.cartItem.findFirst({
    where: { userId, productId },
  });

  if (existingCartItem) {
    return await prisma.cartItem.update({
      where: { id: existingCartItem.id },
      data: { quantity: existingCartItem.quantity + quantity },
    });
  }

  return await prisma.cartItem.create({
    data: { userId, productId, quantity },
  });
};

// specific user cart item get
export const getUserCartFromDB = async (userId: string) => {
  return await prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        select: {
          id: true,
          title: true,
          price: true,
          stock: true,
        },
      },
    },
  });
};

// cart item remove
export const removeFromCartInDB = async (id: string) => {
  return await prisma.cartItem.delete({
    where: { id },
  });
};