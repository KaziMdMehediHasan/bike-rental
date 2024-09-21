import mongoose from "mongoose";
import { TRental } from "./rentals.interface";
import { Rentals } from "./rentals.model";
import { Bikes } from "../Bike/bike.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const rentBikeToDB = async (payload: Partial<TRental>) => {
    const bikeData = await Bikes.findById({ _id: payload.bikeId });
    // if user tries to rent a bike that is already out for rent
    if (!bikeData?.isAvailable) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Bike is not available at this moment');
    }

    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // transaction 1: create a rental
        const newRental = await Rentals.create([payload], { session });
        if (!newRental.length) {
            throw new AppError(httpStatus.NOT_MODIFIED, `Could not create rental`);
        }

        const retrievedBikeId = newRental[0]?.bikeId;
        // transaction 2: updating the bike availability
        const updateBikeAvailability = await Bikes.findByIdAndUpdate(
            { _id: retrievedBikeId },
            { $set: { isAvailable: false } },
            { session, new: true }
        )

        if (!updateBikeAvailability) {
            throw new AppError(httpStatus.NOT_MODIFIED, `Could not update bike availability`);
        }

        await session.commitTransaction();
        await session.endSession();

        return newRental[0];
    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err;
    }

}

const returnBikeToDB = async (payload: Partial<TRental>, id: string) => {
    const session = await mongoose.startSession();
    const existingBikeRentalData = await Rentals.findById(
        { _id: id }
    );

    const returnBikeUpdatedData = {
        returnTime: payload?.returnTime,
        totalCost: payload?.totalCost,
        isReturned: payload?.isReturned,
        finalPaymentId: payload?.finalPaymentId
    }

    if (existingBikeRentalData?.isReturned) {
        throw new AppError(httpStatus.BAD_REQUEST, `Bike already returned`);
    }

    // checking if the bike exist 
    const bikeData = await Bikes.findById({ _id: existingBikeRentalData?.bikeId });

    if (!bikeData) {
        throw new AppError(httpStatus.NOT_FOUND, 'No price per hour data found for the bike');
    }

    // codes commented above are needed


    //calculating the time difference between rent and return
    // const startTimeInMS = existingBikeRentalData?.startTime.getTime();
    // const returnTimeInMS = Date.now();
    // const returnTime = new Date();
    // let totalCost: number = 0;

    // if (startTimeInMS) {
    //     const totalRentDuration = (returnTimeInMS - startTimeInMS) / (1000 * 60 * 60); //to convert milliseconds to hours
    //     totalCost = Number((totalRentDuration * Number(bikeData?.pricePerHour)).toFixed(2));
    //     // console.log(Number(totalCost.toFixed(2)));
    // } else {
    //     throw new AppError(httpStatus.NOT_ACCEPTABLE, 'Invalid Start Time')
    // }

    // codes below will be nedded


    try {
        session.startTransaction();
        //transaction1: update the return status and totalCost of the rent
        const updateRentAndReturnStatus = await Rentals.findByIdAndUpdate(
            { _id: id },
            // { $set: { returnTime: payload.returnTime, totalCost: payload.totalCost, isReturned: true } },
            returnBikeUpdatedData,
            { new: true, session }
        );

        if (!updateRentAndReturnStatus) {
            throw new Error('Unable to return the bike');
        }
        // transaction 2: update the bike availability status

        const bikeIsAvailable = await Bikes.findByIdAndUpdate(
            { _id: existingBikeRentalData?.bikeId },
            { $set: { isAvailable: true } },
            { new: true, session }
        )

        if (!bikeIsAvailable) {
            throw new Error(`Bike available status could not be updated`)
        }
        // console.log(startTime, returnTime);

        await session.commitTransaction();
        await session.endSession();
        return { updateRentAndReturnStatus, bikeIsAvailable }

    } catch (err) {
        await session.abortTransaction();
        await session.endSession();
        throw err
    }

}

const getAllRentalsFromDB = async (payload: string) => {
    const result = await Rentals.find(
        { userId: payload }
    )
        .populate('bikeId').populate('userId');
    return result;
}
export const RentalsServices = {
    rentBikeToDB,
    returnBikeToDB,
    getAllRentalsFromDB
}