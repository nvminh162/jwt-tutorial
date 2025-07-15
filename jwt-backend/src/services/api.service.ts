import { prisma } from "config/client";

export const handleGetAllUsers = async () => {
  return await prisma.user.findMany();
};

export const handleGetUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
