import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const checkValidJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const path = req.path;
  const whiteList = ["/login"];

  const isWhiteList = whiteList.some((item) => item === path);
  if (isWhiteList) {
    next();
    return;
  }

  const token = req.headers["authorization"]?.split(" ")[1]; // format: Bearer <token>

  try {
    const dataDecoded: any = jwt.verify(token, process.env.JWT_SECRET);
    (req.user = {
      id: dataDecoded.id,
      username: dataDecoded.username,
      password: "",
      fullName: "",
      address: "",
      phone: "",
      accountType: dataDecoded.accountType,
      avatar: dataDecoded.avatar,
      role: dataDecoded.role,
    }),
      next();
  } catch (error) {
    console.log(error.message);
    res.status(401).json({
      data: null,
      message: "Token không hợp lệ (không truyền lên hoặc token hết hạn)",
    });
  }
};
