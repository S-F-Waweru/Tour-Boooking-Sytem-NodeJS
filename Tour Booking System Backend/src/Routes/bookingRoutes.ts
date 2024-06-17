import { Router } from "express";
import { addBooking, deleteBooking, getBooking, getUserBookings, getbookings, updateBooking } from "../Controllers/bookingsController";
import { checkUserPermission, ifAdmin, verifyToken } from "../Middleware";

const bookingRouter = Router()

bookingRouter.post("",verifyToken, addBooking)
bookingRouter.get("",verifyToken, ifAdmin, getbookings)
bookingRouter.get("/:Id",verifyToken, checkUserPermission,getBooking)
bookingRouter.get("/user/:Id",verifyToken, checkUserPermission, getUserBookings)
bookingRouter.put("/:Id",verifyToken, checkUserPermission, updateBooking)
bookingRouter.delete("/:Id",verifyToken, checkUserPermission, deleteBooking)

export default bookingRouter


