import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { AuthServices } from "./auth.service";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createNewUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        // const validatedUserData = userValidation.createUserValidationSchema.parse(req.body);

        const userInfo = { ...req.body, role: 'user' };
        const result = await AuthServices.createNewUserIntoDB(userInfo);
        const responseObject = result.toObject();
        const copiedResponse = { ...responseObject };
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { password, ...rest } = copiedResponse;

        // using type guard to avoid error
        if (!rest?.createdAt || !rest?.updatedAt || rest?.__v === undefined) {
            throw new AppError(httpStatus.NO_CONTENT, "Not Found");
        }

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
const loginUser = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        // const validatedCredentials = userValidation.loginValidationSchema.parse(req.body);
        const result = await AuthServices.loginUserIntoDB(req.body);
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

export const AuthControllers = {
    createNewUser,
    loginUser
}