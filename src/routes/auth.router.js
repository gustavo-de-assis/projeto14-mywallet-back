import { Router } from "express";
import {
  getUser,
  signInUser,
  signUpUser,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/sign-up", signUpUser);
authRouter.post("/sign-in", signInUser);
authRouter.get("/userInfo", getUser);

export { authRouter };
