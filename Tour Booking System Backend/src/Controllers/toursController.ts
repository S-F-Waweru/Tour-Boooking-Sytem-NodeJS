import { Request, Response } from "express";
import { v4 as uid } from "uuid";
import { DBHelper } from "../DatabaseHelpers";
import { Tour } from "../Models/toursModels";
import { TourSchema } from "../Helpers";


const dbInstance = new DBHelper()

export const addTour = (req: Request, res: Response) => {

    try {
        const Id = uid()
        const { Name, Destination, Description, Price } = req.body

        const { error } = TourSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        dbInstance.exec('addTour', { Id, Name, Destination, Description, Price })

        return res.status(201).json({ message: "Tour  added sucessfully" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}


// all tours
export const getTours = async (req: Request, res: Response) => {
    try {
        const tours = (await dbInstance.exec('getTours', {})).recordset as Tour[]

        if (tours.length != 0) {
            return res.status(200).json(tours)
        }
        return res.status(404).json("No tours found!   -\(0_0)/-")

    } catch (error: any) {
        return res.status(500).json(error.message)

    }
}

// get 1 tour
export const getTour = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const Id = req.params.Id

        const tour = (await dbInstance.exec('getTour', { Id })).recordset as Tour[]

        if (tour.length != 0) {
            return res.status(200).json(tour)
        }

        return res.status(404).json("No Tour Macthes that ID!   -\(0_0)/-")

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}


export const upadateTour = async (req: Request<{ Id: string }>, res: Response) => {
    try {
        const Id = req.params.Id
        const { Name, Destination, Description, Price } = req.body

        const { error } = TourSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }
        const tour = (await dbInstance.exec('getTour', { Id })).recordset as Tour[]


        if (tour.length != 0) {
              dbInstance.exec('updateTour', { Id, Name, Destination, Description, Price })
        res.status(200).json({ message: "Tour updated successfully" });
        }
        return res.status(200).json({message : "Tour not Found"})
      
    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const deleteTour = async(req: Request<{ Id: string }>, res: Response)=>{
    try {
        const Id = req.params.Id
        const tour = (await dbInstance.exec('getTour', { Id })).recordset as Tour[]

        if (tour.length != 0) {
            dbInstance.exec('deleteTour', { Id })
            res.status(200).json({ message: "Tour Deleted  -\(>_<)/-" });
        }
        res.status(404).json({ message: "Tour Not Found-\(>_<)/-" });

        
        
    } catch (error:any) {
        return res.status(500).json(error.message)
    }
}