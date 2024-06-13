import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import { TUser } from "./user.interface";


const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await UserServices.getUserFromDB();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: result
        })
    } catch (err) {
        next(err);
    }
}

const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const validatedUserData = userValidation.createUserValidationSchema.parse(req.body);
        const result = await UserServices.createNewUserIntoDB(validatedUserData);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }

}
export const UserControllers = {
    getUser,
    createNewUser
}