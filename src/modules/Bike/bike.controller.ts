import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { BikeValidation } from "./bike.validation";
import { BikeServices } from "./bike.service";
import httpStatus from "http-status";

const createBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const validatedBikeData = BikeValidation.createBikeValidationSchema.parse(req.body);
        const result = await BikeServices.createBikeIntoDB(validatedBikeData);

        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike added successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }

}
const getAllBikes = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.getAllBikesFromDB();
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bikes retrieved successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }
}

const updateBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.updateBikesIntoDB(req.params.id, req.body);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike updated successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }

}

const deleteBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.deleteBikesFromDB(req.params.id);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike deleted successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }

}
export const BikeController = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike
}