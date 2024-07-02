import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/authController";
import { ifAdmin, verifyToken } from "../Middleware";
import { deleteUser } from "../Controllers/adminController";

const authRouter = Router()

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)





export default authRouter
