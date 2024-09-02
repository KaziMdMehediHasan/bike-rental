import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { BikeServices } from "./bike.service";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const createBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.createBikeIntoDB(req.body);
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
        if (!result.length) {
            throw new AppError(httpStatus.NO_CONTENT, 'No Data Found');
        }
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

const getSingleBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.getSingleBikeFromDB(req.params.id);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Bike data retrieved successfully',
            data: result
        })
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
    getSingleBike,
    updateBike,
    deleteBike
}