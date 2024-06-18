import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { RentalsServices } from "./rentals.service";
import { TRental } from "./rentals.interface";
import httpStatus from "http-status";

const rentBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { bikeId, startTime } = req.body;
    const rentalData: TRental = {
        userId: req.user?.userId,
        bikeId: bikeId,
        startTime: startTime
    }
    try {
        // const validatedRentData = RentalsValidations.bikeRentValidationSchema.parse(rentalData);
        const result = await RentalsServices.rentBikeToDB(rentalData);

        const formattedResponseData = {
            _id: result?._id,
            userId: result?.userId,
            bikeId: result?.bikeId,
            startTime: result?.startTime.toISOString().replace('0.000Z', '0Z'),
            returnTime: result?.returnTime,
            totalCost: result?.totalCost,
            isReturned: result?.isReturned
        }
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Rental created successfully",
            data: formattedResponseData
        })
    } catch (err) {
        next(err);
    }

}

const returnBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await RentalsServices.returnBikeToDB(req.params.id);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike returned successfully",
            data: result.updateRentAndReturnStatus
        })
    } catch (err) {
        next(err);
    }

}

const getAllRentals = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await RentalsServices.getAllRentalsFromDB(req.user?.userId);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Rentals retrieved successfully",
            data: result
        })
    } catch (err) {
        next(err);
    }

}

export const RentalsControllers = {
    rentBike,
    returnBike,
    getAllRentals
}