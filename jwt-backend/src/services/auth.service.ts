import { prisma } from "config/client";
import { ACCOUNT_TYPE } from "config/constants";
import { comparePassword, hashPassword } from "./user.service";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const isEmailExist = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { username: email },
  });

  if (user) return true;
  return false;
};

export const registerNewUser = async (
  fullName: string,
  email: string,
  password: string
) => {
  const newPassword = await hashPassword(password);

  const userRole = await prisma.role.findUnique({
    where: { name: "USER" },
  });

  if (userRole) {
    await prisma.user.create({
      data: {
        username: email,
        password: newPassword,
        fullName: fullName,
        accountType: ACCOUNT_TYPE.SYSTEM,
        roleId: userRole.id,
      },
    });
  } else {
    throw new Error("User Role không tồn tại!");
  }
};

export const updateUserById = async (
  id: number,
  fullName: string,
  address: string,
  phone: string
) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      fullName,
      address,
      phone,
    },
  });
};

export const deleteUserById = async (id: number) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

export const handleUserLogin = async (username: string, password: string) => {
  //check user exist in database
  const user = await prisma.user.findUnique({
    where: { username: username },
    include: { role: true },
  });

  if (!user) {
    throw new Error(`Username ${username} not found`);
  }

  //compare password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    throw new Error(`Invalid password`);
  }

  //Có user login => định nghĩa access token
  const payload = {
    id: user.id,
    username: user.username,
    accountType: user.accountType,
    avatar: user.avatar,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET;
  const expiresIn: any = process.env.JWT_EXPIRES_IN;

  const access_token = jwt.sign(payload, secret, { expiresIn: expiresIn });
  return access_token;
};
