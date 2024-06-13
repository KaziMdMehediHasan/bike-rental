import { Request, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import { TUser } from "./user.interface";


const getUser = async (req: Request, res: Response) => {
    const result = await UserServices.getUserFromDB();

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: result
    })

    return result;
}

const createNewUser = async (req: Request, res: Response) => {
    const validatedUserData = userValidation.createUserValidationSchema.parse(req.body);
    const result = await UserServices.createNewUserIntoDB(validatedUserData);

    res.status(201).json({
        success: true,
        statusCode: 201,
        message: "User registered successfully",
        data: result
    })
}
export const UserControllers = {
    getUser,
    createNewUser
}