import prisma from "../config/prisma.js";

export const createWebsite = async (userId, url, name) => {
  return await prisma.website.create({
    data: {
      url,
      name,
      userId,
    },
  });
};

export const getUserWebsites = async (userId) => {
  return await prisma.website.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteWebsite = async (id, userId) => {
  return await prisma.website.delete({
    where: {
      id,
      userId,
    },
  });
};