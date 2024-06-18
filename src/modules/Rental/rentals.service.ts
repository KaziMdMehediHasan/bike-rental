import mongoose from "mongoose";
import { TRental } from "./rentals.interface";
import { Rentals } from "./rentals.model";
import { Bikes } from "../Bike/bike.model";

const rentBikeToDB = async (payload: Partial<TRental>) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        // transaction 1: create a rental
        const newRental = await Rentals.create([payload], { session });
        if (!newRental.length) {
            throw new Error(`Could not create rental`);
        }

        const retrievedBikeId = newRental[0]?.bikeId;
        // transaction 2: updating the bike availability
        const updateBikeAvailability = await Bikes.findByIdAndUpdate(
            { _id: retrievedBikeId },
            { $set: { isAvailable: false } },
            { session, new: true }
        )

        if (!updateBikeAvailability) {
            throw new Error(`Could not update bike availability`);
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

const returnBikeToDB = async (payload: string) => {
    const session = await mongoose.startSession();

    const existingBikeData = await Rentals.findById(
        { _id: payload }
    );
    const startTimeInMS = existingBikeData?.startTime.getTime();
    const returnTimeInMS = Date.now();
    const returnTime = new Date();
    let totalCost: number = 0;

    if (startTimeInMS) {
        const totalRentDuration = (returnTimeInMS - startTimeInMS) / (1000 * 60 * 60); //to convert milliseconds to hours
        totalCost = Number((totalRentDuration * 15).toFixed(2));
        // console.log(Number(totalCost.toFixed(2)));
    } else {
        throw new Error('Invalid Time')
    }

    try {
        session.startTransaction();
        //transaction1: update the return status and totalCost of the rent
        const updateRentAndReturnStatus = await Rentals.findByIdAndUpdate(
            { _id: payload },
            { $set: { returnTime: returnTime, totalCost: totalCost, isReturned: true } },
            { new: true, session }
        );

        if (!updateRentAndReturnStatus) {
            throw new Error('Unable to return the bike');
        }
        // transaction 2: update the bike availability status

        const bikeIsAvailable = await Bikes.findByIdAndUpdate(
            { _id: existingBikeData?.bikeId },
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
    );
    return result;
}
export const RentalsServices = {
    rentBikeToDB,
    returnBikeToDB,
    getAllRentalsFromDB
}