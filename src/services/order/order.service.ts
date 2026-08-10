import { prisma } from "../../lib/prisma.js";

type TOrderPayload = {
  userId: string;
  totalAmount: number;
};

// new item create and transaction handle
export const createOrderInDB = async (payload: TOrderPayload) => {
  const { userId, totalAmount } = payload;

  return await prisma.$transaction(async (tx) => {
    
    const cartItems = await tx.cartItem.findMany({
      where: { userId },
      include: { product: true },
    });

    if (cartItems.length === 0) {
      throw new Error("Your cart is empty!");
    }

    // order and order item entry
    const newOrder = await tx.order.create({
      data: {
        userId,
        totalAmount,
        status: "PENDING",
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    // order complete cart empty
    await tx.cartItem.deleteMany({
      where: { userId },
    });

    return newOrder;
  });
};

// user order history get
export const getUserOrdersFromDB = async (userId: string) => {
  return await prisma.order.findMany({
    where: { userId, isDeleted: false },
    include: {
      orderItems: {
        include: {
          product: {
            select: { id: true, title: true, price: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};