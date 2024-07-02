import { Router } from "express";
import { addHotel, deleteHotel, getHotel, getHotels, updateHotel } from "../Controllers/hotelsController";
import { ifAdmin, verifyToken } from "../Middleware";


const hotelRouter = Router()

hotelRouter.post("",verifyToken, ifAdmin,addHotel)
hotelRouter.get("",verifyToken, getHotels)
hotelRouter.get("/:Id",verifyToken,ifAdmin, getHotel)
hotelRouter.put("/:Id",verifyToken, ifAdmin,updateHotel)
hotelRouter.delete("/:Id",verifyToken, ifAdmin,deleteHotel)

export default hotelRouter




