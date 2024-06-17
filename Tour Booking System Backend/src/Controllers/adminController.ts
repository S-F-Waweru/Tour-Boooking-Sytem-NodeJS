import { Request, Response } from "express";
import { DBHelper } from "../DatabaseHelpers";
import { User } from "../Models/userModels";
import { Role, UserRole } from "../Models/userRole";

const dbInstance = new DBHelper()
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = (await dbInstance.exec('getAllUsers', {})).recordset as User[]

        if (users.length !== 0) {
            return res.status(200).json(users)
        }
        return res.status(404).json({ message: "No users found!" })

    } catch (error: any) {
        return res.status(500).json(error.message)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const Id = req.params.Id
        const user = (await dbInstance.exec('getUserViaId', { Id })).recordset as User[]
        console.log(user)
        if (user[0].isDeleted === 1) {
            return res.status(200).json({ message: "User Not Found" })

        }

        await dbInstance.exec('deleteUser', { Id })
        return res.status(200).json({ message: "User deleted Sucessfully" })

    } catch (error: any) {
        return res.status(500).json(error.message)

    }
}



export const changeRole = async (req: Request, res: Response) => {
    try {
        const userRole = (await dbInstance.exec('getUserRole', { UserId: req.params.Id })).recordset as UserRole[]
        if (userRole.length === 0) {
            return res.status(404).json("User not found")
        }
        if (userRole[0].Role === Role.ADMIN) {
            return res.status(404).json("User is Admin Already")
        }

        dbInstance.exec('changetoAdmin', { UserId: req.params.Id })
        res.status(200).json({ message: "User is now Admin" })
    } catch (error: any) {
        return res.status(500).json(error.message)
    }

}

