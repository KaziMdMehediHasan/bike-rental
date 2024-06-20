"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const rentals_model_1 = require("./rentals.model");
const bike_model_1 = require("../Bike/bike.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const rentBikeToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const bikeData = yield bike_model_1.Bikes.findById({ _id: payload.bikeId });
    // if user tries to rent a bike that is already out for rent
    if (!(bikeData === null || bikeData === void 0 ? void 0 : bikeData.isAvailable)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Bike is not available at this moment');
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // transaction 1: create a rental
        const newRental = yield rentals_model_1.Rentals.create([payload], { session });
        if (!newRental.length) {
            throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, `Could not create rental`);
        }
        const retrievedBikeId = (_a = newRental[0]) === null || _a === void 0 ? void 0 : _a.bikeId;
        // transaction 2: updating the bike availability
        const updateBikeAvailability = yield bike_model_1.Bikes.findByIdAndUpdate({ _id: retrievedBikeId }, { $set: { isAvailable: false } }, { session, new: true });
        if (!updateBikeAvailability) {
            throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, `Could not update bike availability`);
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newRental[0];
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const returnBikeToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    const existingBikeRentalData = yield rentals_model_1.Rentals.findById({ _id: payload });
    // handling edge case when admin tries to return a bike that is already returned
    if (existingBikeRentalData === null || existingBikeRentalData === void 0 ? void 0 : existingBikeRentalData.isReturned) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, `Bike already returned`);
    }
    // checking if the bike exist 
    const bikeData = yield bike_model_1.Bikes.findById({ _id: existingBikeRentalData === null || existingBikeRentalData === void 0 ? void 0 : existingBikeRentalData.bikeId });
    if (!bikeData) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No price per hour data found for the bike');
    }
    //calculating the time difference between rent and return
    const startTimeInMS = existingBikeRentalData === null || existingBikeRentalData === void 0 ? void 0 : existingBikeRentalData.startTime.getTime();
    const returnTimeInMS = Date.now();
    const returnTime = new Date();
    let totalCost = 0;
    if (startTimeInMS) {
        const totalRentDuration = (returnTimeInMS - startTimeInMS) / (1000 * 60 * 60); //to convert milliseconds to hours
        totalCost = Number((totalRentDuration * Number(bikeData === null || bikeData === void 0 ? void 0 : bikeData.pricePerHour)).toFixed(2));
        // console.log(Number(totalCost.toFixed(2)));
    }
    else {
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, 'Invalid Start Time');
    }
    try {
        session.startTransaction();
        //transaction1: update the return status and totalCost of the rent
        const updateRentAndReturnStatus = yield rentals_model_1.Rentals.findByIdAndUpdate({ _id: payload }, { $set: { returnTime: returnTime, totalCost: totalCost, isReturned: true } }, { new: true, session });
        if (!updateRentAndReturnStatus) {
            throw new Error('Unable to return the bike');
        }
        // transaction 2: update the bike availability status
        const bikeIsAvailable = yield bike_model_1.Bikes.findByIdAndUpdate({ _id: existingBikeRentalData === null || existingBikeRentalData === void 0 ? void 0 : existingBikeRentalData.bikeId }, { $set: { isAvailable: true } }, { new: true, session });
        if (!bikeIsAvailable) {
            throw new Error(`Bike available status could not be updated`);
        }
        // console.log(startTime, returnTime);
        yield session.commitTransaction();
        yield session.endSession();
        return { updateRentAndReturnStatus, bikeIsAvailable };
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
});
const getAllRentalsFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield rentals_model_1.Rentals.find({ userId: payload });
    return result;
});
exports.RentalsServices = {
    rentBikeToDB,
    returnBikeToDB,
    getAllRentalsFromDB
};
