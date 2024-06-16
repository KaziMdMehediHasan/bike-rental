import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { userValidation } from "./user.validation";
import { TUser } from "./user.interface";
import httpStatus from "http-status";
import { Users } from "./user.model";
import { ExtendedRequest } from "../../interface";

const getAllUsers = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        console.log('test', req.user)
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

const createNewUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const validatedUserData = userValidation.createUserValidationSchema.parse(req.body);
        const result = await UserServices.createNewUserIntoDB(validatedUserData);
        const responseObject = result.toObject();
        const copiedResponse = { ...responseObject };
        const { password, ...rest } = copiedResponse;

        // sending an optimized response that doesn't expose the password to anyone
        const optimizedResponse = {
            _id: rest._id,
            name: rest.name,
            email: rest.email,
            phone: rest.phone,
            address: rest.address,
            role: rest.role,
            createdAt: rest.createdAt,
            updatedAt: rest.updatedAt,
            __v: rest.__v
        }
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: optimizedResponse
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

const loginUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const validatedCredentials = userValidation.loginValidationSchema.parse(req.body);
        const result = await UserServices.loginUserIntoDB(validatedCredentials);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'User logged in successfully',
            token: result.accessToken,
            data: result.desiredUserData
        })
    } catch (err) {
        next(err)
    }
}

export const UserControllers = {
    getUserProfile,
    createNewUser,
    loginUser,
    getAllUsers,
    updateUserProfile
}