import { Router } from "express";
import { addBooking, deleteBooking, getBooking, getUserBookings, getbookings, updateBooking } from "../Controllers/bookingsController";
import { checkUserPermission, ifAdmin, verifyToken } from "../Middleware";

const bookingRouter = Router()

bookingRouter.post("",verifyToken, addBooking)
bookingRouter.get("",verifyToken, ifAdmin, getbookings)
bookingRouter.get("/:Id",verifyToken, checkUserPermission||ifAdmin,getBooking)
bookingRouter.get("/user/:Id",verifyToken, checkUserPermission ||ifAdmin, getUserBookings)
bookingRouter.put("/:Id",verifyToken, checkUserPermission ||ifAdmin, updateBooking)
bookingRouter.delete("/:Id",verifyToken, checkUserPermission ||ifAdmin, deleteBooking)

export default bookingRouter


