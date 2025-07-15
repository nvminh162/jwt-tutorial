import { Request, Response } from "express";
import { handleGetAllUsers, handleGetUserById } from "services/api.service";
import {
  deleteUserById,
  handleUserLogin,
  registerNewUser,
  updateUserById,
} from "services/auth.service";
import {
  RegisterSchema,
  TRegisterSchema,
} from "src/validation/register.schema";

export const getAllUsersAPI = async (req: Request, res: Response) => {
  const users = await handleGetAllUsers();
  const user = req.user;
  console.log(user);

  res.status(200).json({ data: users });
};

export const getUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await handleGetUserById(+id);
  res.status(200).json({ data: user });
};

export const createUserAPI = async (req: Request, res: Response) => {
  const { fullName, email, password } = req.body as TRegisterSchema;
  const validate = await RegisterSchema.safeParseAsync(req.body);
  if (!validate.success) {
    //error
    const errorsZod = validate.error.issues;
    const errors = errorsZod?.map(
      (item) => `${item.message} (${item.path[0]})`
    );

    res.status(400).json({
      errors,
    });
    return;
  }
  await registerNewUser(fullName, email, password);
  res.status(201).json({
    data: "Create user success",
  });
};

export const updateUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { fullName, address, phone } = req.body;

  await updateUserById(+id, fullName, address, phone);

  res.status(200).json({
    data: "Update user success",
  });
};

export const deleteUserByIdAPI = async (req: Request, res: Response) => {
  const { id } = req.params;

  await deleteUserById(+id);

  res.status(200).json({
    data: "Delete user success",
  });
};

export const loginAPI = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const access_token = await handleUserLogin(username, password);
    res.status(200).json({
      data: {
        access_token,
      },
    });
  } catch (error) {
    res.status(401).json({
      data: null,
      message: error.message,
    });
  }
};

export const fecthAccountAPI = async (req: Request, res: Response) => {
  const user = req.user;
  res.status(200).json({
    data: user,
  });
};
