import { Router } from "express";
import { ifAdmin, verifyToken } from "../Middleware";
import { changeRole, deleteUser, getAllUsers } from "../Controllers/adminController";
import { registerAdmin } from "../Controllers/authController";

const adminRouter = Router()

adminRouter.get("",verifyToken,ifAdmin, getAllUsers)
adminRouter.put("/change/:Id",verifyToken, ifAdmin, changeRole)
adminRouter.put("/delete/:Id", verifyToken,ifAdmin , deleteUser)

// dont know how to protect this
adminRouter.post("/register/admin",registerAdmin)


export default adminRouter
