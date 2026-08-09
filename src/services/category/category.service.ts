import { prisma } from "../../lib/prisma.js";

// category create
export const createCategoryInDB = async (name: string) => {
  return await prisma.category.create({
    data: { name },
  });
};

// all category 
export const getAllCategoriesFromDB = async () => {
  return await prisma.category.findMany({
    where: { isDeleted: false },
    include: {
      _count: {
        select: { products: true },
      },
    },
  });
};

// single category
export const getSingleCategoryFromDB = async (id: string) => {
  return await prisma.category.findFirst({
    where: { id, isDeleted: false },
  });
};

// category update
export const updateCategoryInDB = async (id: string, name: string) => {
  return await prisma.category.update({
    where: { id },
    data: { name },
  });
};

// category soft delete
export const deleteCategoryFromDB = async (id: string) => {
  return await prisma.category.update({
    where: { id },
    data: { isDeleted: true },
  });
};