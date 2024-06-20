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
exports.BikeController = void 0;
const bike_service_1 = require("./bike.service");
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const createBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeServices.createBikeIntoDB(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Bike added successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const getAllBikes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeServices.getAllBikesFromDB();
        if (!result.length) {
            throw new AppError_1.default(http_status_1.default.NO_CONTENT, 'No Data Found');
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Bikes retrieved successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const updateBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeServices.updateBikesIntoDB(req.params.id, req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Bike updated successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeServices.deleteBikesFromDB(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: "Bike deleted successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
exports.BikeController = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike
};
