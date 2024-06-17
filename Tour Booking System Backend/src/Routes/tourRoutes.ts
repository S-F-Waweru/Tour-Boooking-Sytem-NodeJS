import { Router } from "express";
import { addTour, deleteTour, getTour, getTours, upadateTour } from "../Controllers/toursController";
import { ifAdmin, verifyToken } from "../Middleware";

const tourRouter = Router()

tourRouter.post("",verifyToken, ifAdmin,addTour)
tourRouter.get("", getTours)
tourRouter.get("/:Id",verifyToken, ifAdmin,getTour)
tourRouter.put("/:Id",verifyToken, ifAdmin,upadateTour)
tourRouter.delete("/:Id",verifyToken,ifAdmin, deleteTour)

export default tourRouter