import { prisma } from "config/client";
import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

//compare password bcrypt
export const comparePassword = async (plainText: string, hashPassword: string) => {
  return await bcrypt.compare(plainText, hashPassword);
}

export const handleGetAllUsers = async () => {
  return prisma.user.findMany();
};

export const handleGetAUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id: +id,
    },
  });
};

export const handleCreateUser = async (
  email: string,
  password: string,
  fullName: string,
  address: string,
  phone: string,
  accountType: string,
  avatar: string,
  role: string,
) => {
  return await prisma.user.create({
    data: {
      username: email,
      password: await hashPassword(password),
      fullName: fullName,
      address: address,
      phone: phone,
      accountType: accountType,
      avatar: avatar,
      roleId: +role,
    },
  });
};

export const handleDeleteUser = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id: +id,
    },
  });
};

export const handleUpdateUser = async (
  id: string,
  email: string,
  password: string | null,
  fullName: string,
  address: string,
  phone: string,
  accountType: string,
  avatar: string | null,
  role: string,
) => {
  // Prepare update data
  const updateData: any = {
    username: email,
    fullName: fullName,
    address: address,
    phone: phone,
    accountType: accountType,
    roleId: +role,
  };

  // Only update password if a new one is provided
  if (password) {
    updateData.password = await hashPassword(password);
  }

  // Only update avatar if a new one is provided
  if (avatar) {
    updateData.avatar = avatar;
  }

  return await prisma.user.update({
    where: {
      id: +id, //convert string to number : (+string => number)
    },
    data: updateData,
  });
};

export const handleGetAllRole = async () => {
  return prisma.role.findMany();
};
