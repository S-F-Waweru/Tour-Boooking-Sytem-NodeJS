import { Response, Request } from "express"
import { v4 as uid } from "uuid"
import { DBHelper } from "../DatabaseHelpers"
import { Hotel } from "../Models/hotelModel"
import { HotelSchema } from "../Helpers"


const dbInstance = new DBHelper()

export const addHotel = (req:Request, res:Response)=>{
    try {
        const Id = uid()
        const {Name , Location, StarRating } = req.body

        const { error } = HotelSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        dbInstance.exec('addHotel' , {Id, Name, Location, StarRating})

        return  res.status(201).json({message : "Hotel Added Successsfilly"})
        
    } catch (error:any) {
        return res.status(500).json(error.message)
        
    }


}

export const getHotels =async (req:Request, res:Response)=>{
    try {

       const hotels = (await dbInstance.exec('getHotels' , {})).recordset as Hotel[]

       if(hotels.length != 0){
        console.log(hotels)
       return res.status(201).json(hotels)
       }

       return res.status(404).json({message : "No Hotels Found!!"})
    } catch (error:any) {
        return res.status(500).json(error.message)
        
    }
}


export const getHotel =async (req:Request<{ Id: string }>, res:Response)=>{
    try {
        const Id = req.params.Id
        console.log(Id)
        const hotel = (await dbInstance.exec('getHotel' , {Id})).recordset as Hotel[]
        console.log(hotel)

        if(hotel.length != 0){
            return res.status(201).json(hotel[0])
        }else{
            return res.status(404).json({message : "No Hotels Found!!"})

        }
 
        
    } catch (error:any) {
        return res.status(500).json(error.message)
        
    }
}


export const updateHotel = async (req:Request<{ Id: string }>, res:Response)=>{
    try {
        const Id = req.params.Id
        const { Name, Location, StarRating } = req.body

        const { error } = HotelSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        const hotel = (await dbInstance.exec('getHotel' , {Id})).recordset as Hotel[]

        if(hotel.length != 0){
            
        await dbInstance.exec('updateHotel', { Id, Name, Location, StarRating })
        return res.status(200).json({ message: "Hotel updated successfully" });
          
        }else{
            return res.status(404).json({message : "Hotel not Found"})

        }

        
    } catch (error:any) {
        return res.status(500).json(error.message)
        
    }
}

export const deleteHotel = async (req:Request<{ Id: string }>, res:Response)=>{
    try {
        const Id = req.params.Id
        console.log(Id)
        const hotels = await (await dbInstance.exec('getHotel' , {Id})).recordset as Hotel[]
        console.log(hotels)
        

        if(hotels.length != 0){
            await dbInstance.exec('deleteHotel', {Id:req.params.Id})
            res.status(200).json({ message: "Hotel Deleted  -\(>_<)/-" });
        }else{
        return res.status(404).json({message : "Hotel not found "})

        }
 

      
        
    } catch (error:any) {
        return res.status(500).json(error.message)
        
    }
}