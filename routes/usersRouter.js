import express from "express";
import {
  current,
  login,
  logout,
  register,
  updateSubscription,
} from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import { userSchema } from "../schemas/usersSchemas.js";
import authMiddleware from "../middleware/auth.js";

const usersRouter = express.Router();

usersRouter.post("/register", validateBody(userSchema), register);
usersRouter.post("/login", validateBody(userSchema), login);
usersRouter.post("/logout", authMiddleware, logout);
usersRouter.get("/current", authMiddleware, current);
usersRouter.patch("/", authMiddleware, updateSubscription);

export default usersRouter;
