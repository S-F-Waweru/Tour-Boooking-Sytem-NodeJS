import { Response, Request } from "express";
import { v4 as uid } from 'uuid'
import Bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.resolve(__dirname, "../../../.env") })

import { DBHelper } from "../DatabaseHelpers";
import RegisterSchema from "../Helpers";
import { Payload, User } from "../Models/userModels";
import { Role } from "../Models/userRole";


const dbInstance = new DBHelper()

export async function registerUser(req: Request, res: Response) {
    try {
        const Id = uid()
        const { Name, Email, Password } = req.body

        // validate
        const { error } = RegisterSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        // hash Password
        const HashedPassword = await Bcrypt.hash(Password, 10)

        //save to DB
        dbInstance.exec('addUser', { Id, Name, Email, Password: HashedPassword })
        // create Role and save as default to customer
        const roleId = uid()
        dbInstance.exec('addUserRole', { Id: roleId, UserId: Id, Role: Role.CUSTOMER })

        return res.status(201).json({ message: "User added Successfully" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export async function registerAdmin(req: Request, res: Response) {
    try {
        const Id = uid()
        const { Name, Email, Password } = req.body

        // validate
        const { error } = RegisterSchema.validate(req.body)
        if (error) {
            return res.status(400).json(error.details[0].message)
        }

        // hash Password
        const HashedPassword = await Bcrypt.hash(Password, 10)

        //save to DB
        dbInstance.exec('addUser', { Id, Name, Email, Password: HashedPassword })
        // create Role and save as default to customer
        const roleId = uid()
        dbInstance.exec('addUserRole', { Id: roleId, UserId: Id, Role: Role.ADMIN })

        return res.status(201).json({ message: "User added Successfully" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export async function loginUser(req: Request, res: Response) {
    try {
        // get user data
        const { Email, Password } = req.body


        
        console.log(req.body)
        const password = Password


        let user = (await dbInstance.exec('getUser', { Email })).recordset as User[]

        if (user.length !== 0) {

            if (user[0].isDeleted === 1) {
                return res.status(404).json({ message: "user is deleted and cannot log in!!" })
            }
            console.log(user)

            console.log(password, user[0].Password)

            const isValid = (await Bcrypt.compare(password, user[0].Password))
            console.log(isValid)
            if (isValid) {
                const payload: Payload = {
                    Sub: user[0].Id,
                    Name: user[0].Name
                }

                // create a token
                const token = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '2h' })
                //get user role
                const getRole = (await dbInstance.exec('getUserRole', {UserId : payload.Sub})).recordset as Role[]
                console.log(getRole[0].Role)
                const role = getRole[0].Role
                const userId = payload.Sub

                return res.status(200).json({ message: "Login Successfull!!", token, role, userId})
            }

            return res.status(404).json({ message: "Invalid Credentials !!" })

        }

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}


