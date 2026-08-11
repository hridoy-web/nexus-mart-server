import { prisma } from "../../lib/prisma.js";

type TCartItemPayload = {
  userId: string;
  productId: string;
  quantity: number;
};

// Add item to cart
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

// Get user cart items with image field
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
          image: true,
        },
      },
    },
  });
};

// Update cart item quantity
export const updateCartItemQuantityInDB = async (id: string, quantity: number) => {
  if (quantity <= 0) {
    return await prisma.cartItem.delete({
      where: { id },
    });
  }

  return await prisma.cartItem.update({
    where: { id },
    data: { quantity },
  });
};

// Remove cart item
export const removeFromCartInDB = async (id: string) => {
  return await prisma.cartItem.delete({
    where: { id },
  });
};