import {
  createUserAPI,
  deleteUserByIdAPI,
  fecthAccountAPI,
  getAllUsersAPI,
  getUserByIdAPI,
  loginAPI,
  updateUserByIdAPI,
} from "controllers/api.controller";
import express, { Express } from "express";
import { checkValidJWT } from "src/middleware/jwt.middleware";

const router = express.Router();

const apiRoutes = (app: Express) => {
  router.get("/users", getAllUsersAPI);
  router.get("/users/:id", getUserByIdAPI);
  router.post("/users", createUserAPI);
  router.put("/users/:id", updateUserByIdAPI);
  router.delete("/users/:id", deleteUserByIdAPI);
  
  router.post("/login", loginAPI);
  
  router.get("/account", fecthAccountAPI);

  app.use("/api", checkValidJWT, router);
};

export default apiRoutes;
