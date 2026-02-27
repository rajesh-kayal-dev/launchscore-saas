import prisma from "../config/prisma.js";

const normalizeUrl = (url) => {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '').toLowerCase();
};

export const createScan = async (userId, url) => {
  const cleanUrl = normalizeUrl(url);
  const score = Math.floor(Math.random() * 40) + 60;

  let website = await prisma.website.findFirst({
    where: { url: cleanUrl, userId }
  });

  if (!website) {
    website = await prisma.website.create({
      data: { url: cleanUrl, userId }
    });
  }

  return await prisma.scan.create({
    data: {
      url: cleanUrl,
      score,
      userId,
      websiteId: website.id
    },
  });
};

export const getDashboardScans = async (userId) => {
  return await prisma.scan.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    distinct: ['url'],
    take: 4
  });
};

export const getAllScans = async (userId, search = "") => {
  return await prisma.scan.findMany({
    where: {
      userId,
      url: { contains: search, mode: 'insensitive' }
    },
    orderBy: { createdAt: "desc" },
  });
};

export const deleteScanRecord = async (userId, scanId) => {
  return await prisma.scan.delete({
    where: { id: scanId, userId }
  });
};

export const getUniqueWebsites = async (userId) => {
  return await prisma.website.findMany({
    where: { userId },
    include: {
      scans: {
        orderBy: { createdAt: 'desc' },
        take: 1
      }
    }
  });
};