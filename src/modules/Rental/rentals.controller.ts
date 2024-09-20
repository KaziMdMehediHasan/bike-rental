import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { RentalsServices } from "./rentals.service";
import { TRental } from "./rentals.interface";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { RentalsValidations } from "./rentals.validation";
import { Types } from "mongoose";
// import { Rentals } from "./rentals.model";

const rentBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { bikeId, startTime, advancePaymentId, finalPaymentId } = req.body;
    const rentalData: TRental = {
        userId: req.user?.userId,
        bikeId: bikeId,
        startTime: startTime,
        advancePaymentId: advancePaymentId,
        finalPaymentId: finalPaymentId
    }

    // console.log(req.user, req.body);
    try {
        const validatedRentData = RentalsValidations.bikeRentValidationSchema.parse(rentalData);

        // the following codes up until result, is a fix for type conflict
        // Checking whether userId and bikeId are valid ObjectId strings. This will help fix the typescript compile error
        if (!Types.ObjectId.isValid(validatedRentData.userId) || !Types.ObjectId.isValid(validatedRentData.bikeId)) {
            throw new AppError(httpStatus.NOT_FOUND, 'Invalid ObjectId');
        }
        // Convert string IDs to Types.ObjectId so that interface and zod type do not conflict
        const userId = new Types.ObjectId(validatedRentData.userId);
        const bikeId = new Types.ObjectId(validatedRentData.bikeId);

        // creating a new rental data that does not conflict with zod 

        const newRentalData: TRental = {
            userId: userId,
            bikeId: bikeId,
            startTime: new Date(validatedRentData.startTime),
            advancePaymentId: advancePaymentId,
            finalPaymentId: finalPaymentId
        };

        // finally sending the data to the service to create a new rental
        const result = await RentalsServices.rentBikeToDB(newRentalData);

        // formatting the response data as per client's requirement
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
        if (!result.length) {
            throw new AppError(httpStatus.NO_CONTENT, 'No Data Found');
        }
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