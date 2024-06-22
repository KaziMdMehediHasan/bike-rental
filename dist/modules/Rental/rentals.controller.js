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
exports.RentalsControllers = void 0;
const rentals_service_1 = require("./rentals.service");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const rentals_validation_1 = require("./rentals.validation");
const mongoose_1 = require("mongoose");
// import { Rentals } from "./rentals.model";
const rentBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { bikeId, startTime } = req.body;
    const rentalData = {
        userId: (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId,
        bikeId: bikeId,
        startTime: startTime
    };
    try {
        const validatedRentData = rentals_validation_1.RentalsValidations.bikeRentValidationSchema.parse(rentalData);
        // the following codes up until result is a fix for type conflict
        // Checking whether userId and bikeId are valid ObjectId strings. This will help fix the compile error
        if (!mongoose_1.Types.ObjectId.isValid(validatedRentData.userId) || !mongoose_1.Types.ObjectId.isValid(validatedRentData.bikeId)) {
            throw new Error('Invalid ObjectId');
        }
        // Convert string IDs to Types.ObjectId so that interface and zod type do not conflict
        const userId = new mongoose_1.Types.ObjectId(validatedRentData.userId);
        const bikeId = new mongoose_1.Types.ObjectId(validatedRentData.bikeId);
        // create a new rental data that does not conflict with zod 
        const newRental = {
            userId: userId,
            bikeId: bikeId,
            startTime: new Date(validatedRentData.startTime)
        };
        // finally sending the data to the service to create a new rental
        const result = yield rentals_service_1.RentalsServices.rentBikeToDB(newRental);
        // formatting the response data as per client's requirement
        const formattedResponseData = {
            _id: result === null || result === void 0 ? void 0 : result._id,
            userId: result === null || result === void 0 ? void 0 : result.userId,
            bikeId: result === null || result === void 0 ? void 0 : result.bikeId,
            startTime: result === null || result === void 0 ? void 0 : result.startTime.toISOString().replace('0.000Z', '0Z'),
            returnTime: result === null || result === void 0 ? void 0 : result.returnTime,
            totalCost: result === null || result === void 0 ? void 0 : result.totalCost,
            isReturned: result === null || result === void 0 ? void 0 : result.isReturned
        };
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Rental created successfully",
            data: formattedResponseData
        });
    }
    catch (err) {
        next(err);
    }
});
const returnBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield rentals_service_1.RentalsServices.returnBikeToDB(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Bike returned successfully",
            data: result.updateRentAndReturnStatus
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllRentals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const result = yield rentals_service_1.RentalsServices.getAllRentalsFromDB((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
        if (!result.length) {
            throw new AppError_1.default(http_status_1.default.NO_CONTENT, 'No Data Found');
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Rentals retrieved successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
exports.RentalsControllers = {
    rentBike,
    returnBike,
    getAllRentals
};
