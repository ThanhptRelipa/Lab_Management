import express from "express";
import * as UserController from "../controllers/users";
import { verifyToken } from "../middleware/tokenMiddle";

const router = express.Router();

router.get("/users", verifyToken, UserController.getAllUsers);

router.get("/userInfo", verifyToken, UserController.getUserInfo);

router.post("/login", UserController.loginAuthen);

router.post("/register", UserController.registerAuthen);

router.patch("/updateUserInfo", UserController.updateInfo);

router.patch("/updatePassword", UserController.updatePassword);

export default router;
