import { NextFunction, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import httpStatus from "http-status";
import { ExtendedRequest } from "../../interface";

const getAllUsers = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: result
        })
    } catch (err) {
        next(err);
    }
}
const getUserProfile = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        let userId: string = '';
        // using a type guard to avoid unwanted error
        if (req.user !== undefined) {
            userId = req.user.userId;
        }
        const result = await UserServices.getUserFromDB(userId);
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User profile retrieved successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }
}


const updateUserProfile = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        let userId: string = '';
        // using a type guard to avoid unwanted error
        if (req.user !== undefined) {
            userId = req.user.userId;
        }

        if (req.body.password || req.body.role) {
            res.status(httpStatus.UNAUTHORIZED).json({
                success: false,
                statusCode: httpStatus.UNAUTHORIZED,
                message: 'Request can not be processed'
            })
        } else {
            const updatedUserProfileData = userValidation.userValidationUpdateSchema.parse(req.body);
            const result = await UserServices.updateUserProfileIntoDB(userId, updatedUserProfileData);

            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Profile updated successfully",
                data: result
            })
        }

    } catch (err) {
        next(err);
    }
}

export const UserControllers = {
    getUserProfile,
    getAllUsers,
    updateUserProfile
}