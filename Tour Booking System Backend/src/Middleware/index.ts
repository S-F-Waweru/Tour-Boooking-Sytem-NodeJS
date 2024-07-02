import jwt from 'jsonwebtoken';
import  { NextFunction, Request, Response } from "express";
import path from 'path'
import dotenv from 'dotenv'
dotenv.config({path:path.resolve(__dirname,"../../.env")})
import { Payload, User } from '../Models/userModels';
import { DBHelper } from '../DatabaseHelpers';
import { Role, UserRole } from '../Models/userRole';






const dbIntance = new DBHelper() 


export interface ExtendedRequest1 extends Request{
    info? : Payload
}
export const verifyToken = (req:ExtendedRequest1, res : Response, next:NextFunction)=>{
    try {
        const token = req.headers['token'] as string
        if(!token){
            return res.status(401).json({message : "You must sign in first !!"})
            }
    
            const decodedData = jwt.verify(token, process.env.SECRET as string)as Payload
            req.info = decodedData
            console.log(decodedData)
            console.log("done verifying");
            
        
    } catch (error) {
        return res.status(500).json(error)
    }

   next()
}


export const checkUserPermission  =async (req:ExtendedRequest1, res : Response, next:NextFunction) =>{

    try {
        const Sub = req.info?.Sub
        console.log(Sub)

        if (Sub === undefined){
          return res.status(401).json({message : "Forbidden !!"})
        }
    
        const userRole = (await dbIntance.exec('getUserRole' , {UserId : Sub})).recordset[0] as UserRole
    
        console.log("--------------------------------")
        console.log("ROLER")
        console.log(userRole.Role)
        console.log(userRole.UserId)
        console.log(Sub)

    console.log("--------------------------------")


    console.log(userRole.Role !== Role.ADMIN)

        if(userRole.UserId !== Sub ){
            return res.status(403).json({message : "You are not Authorised!!"})
        }
    } catch (error:any) {
        return res.status(500).json(error)
        
    }

    next()
    }

    export const ifAdmin = async (req:ExtendedRequest1, res : Response, next:NextFunction)=>{
        console.log("Now checking if admin");
        
        try {

            console.log("IfADmin")
            console.log(req.info)
            const Sub = req.info?.Sub
    
            if (Sub === undefined){
              return res.status(401).json({message : "Forbidden !!"})
            }
        
            const userRole = (await dbIntance.exec('getUserRole' , {UserId : Sub})).recordset[0] as UserRole
        
            console.log(userRole.Role)
            if(userRole.Role !== Role.ADMIN){
                return res.status(403).json({message : "You are not Authorised!!"})
            }
            console.log("Done");
            
        } catch (error:any) {
            return res.status(500).json(error)
            
        }
        next()

    }

