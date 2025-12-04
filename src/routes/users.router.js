import { Router } from "express";
import UserController from "../controllers/user.controller.js";

const userRouter = Router();
const userController = new UserController();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:uid', userController.getUserById);
userRouter.delete('/:uid', userController.deleteUser);

export default userRouter;