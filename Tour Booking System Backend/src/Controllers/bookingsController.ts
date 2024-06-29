import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import { DBHelper } from "../DatabaseHelpers";
import { Booking } from "../Models/bookingModel";
import { BookingSchema } from "../Helpers";
import { Payload } from "../Models/userModels";

const dbInstance = new DBHelper()
export interface ExtendedRequest1 extends Request {
    info?: Payload
}

export const addBooking = (req: ExtendedRequest1, res: Response) => {
    try {
        console.log(req.info)
        const Id = uid()
        const { TourId, HotelId, BookingDate } = req.body
        const UserId = req.info?.Sub
        if (UserId === undefined) {
            return res.status(400).json({ message: "sign Up First!!" })
        }
        const { error } = BookingSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        console.log({ Id, UserId, TourId, HotelId, BookingDate })

        dbInstance.exec('addBooking', { Id, UserId, TourId, HotelId, BookingDate })
        return res.status(201).json({ message: "Booking added successfully" })
    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}

export const getbookings = async (req: Request, res: Response) => {
    console.log("we are here");

    try {
        const bookings = (await dbInstance.exec('getBookings', {})).recordset as Booking[]
        if (bookings.length != 0) {
            return res.status(200).json(bookings)
        }
        return res.status(404).json({ message: "No Bookings Yet" })
    } catch (error) {
        return res.status(500).json(error)
    }

}


export const getBooking = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const Id = req.params.Id
        const booking = (await dbInstance.exec('getBooking', { Id })).recordset as Booking[]
        if (booking.length != 0) {
            return res.status(200).json(booking)
        }

        return res.status(404).json({ message: "No Bookings Yet" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}

export const getUserBookings = async (req: Request, res: Response) => {
    try {
        const UserId = req.params.Id
        const booking = (await dbInstance.exec('getUserBookings', { UserId })).recordset as Booking[]
        console.log(booking)
        if (booking.length != 0) {
            return res.status(200).json(booking)
        }

        return res.status(404).json({ message: "No Bookings Yet" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}


export const updateBooking = async (req: ExtendedRequest1, res: Response) => {
    try {
        const Id = req.params.Id
        const UserId = req.info?.Sub
        if (UserId === undefined) {
            return res.status(401).json("Unauthorised")
        }
        const { TourId, HotelId, BookingDate } = req.body
        const { error } = BookingSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        const booking = (await dbInstance.exec('getUserBookings', { UserId })).recordset as Booking[]
        console.log(booking)
        if (booking.length != 0) {
            dbInstance.exec('updateBooking', { Id, UserId, TourId, HotelId, BookingDate })
            res.status(200).json({ message: "Booking updated successfully" });
    
        }
        
        return res.status(404).json({ message: "Booking  Not found" })

       
    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}


export const deleteBooking = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const Id = req.params.Id
        
        const booking = (await dbInstance.exec('getBooking', {Id})).recordset as Booking[]
        console.log(booking)
        if(booking.length!==0){
            await dbInstance.exec('deleteBooking', {Id})
            return res.status(200).json({message : "Booking deleted "})
        }else{
        return res.status(404).json({message : "Booking not found "})

        }


       

    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}
