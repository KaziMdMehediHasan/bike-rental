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
const cloudinary_1 = require("cloudinary");
const createBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        if (req.body.year)
            payload.year = Number(req.body.year);
        if (req.body.cc)
            payload.cc = Number(req.body.cc);
        if (req.body.pricePerHour)
            payload.pricePerHour = Number(req.body.pricePerHour);
        if (req.body.isAvailable)
            payload.isAvailable = req.body.isAvailable === 'false' ? false : true;
        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                var _a;
                const upload_stream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'bike_images'
                }, (error, results) => {
                    if (error) {
                        reject(error);
                        throw new AppError_1.default(400, "Error uploading image");
                    }
                    else {
                        resolve(results);
                    }
                });
                upload_stream.end((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
            });
            const result = yield uploadPromise;
            payload.img = result.url;
        }
        // console.log('final payload');
        const result = yield bike_service_1.BikeServices.createBikeIntoDB(payload);
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
const getSingleBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield bike_service_1.BikeServices.getSingleBikeFromDB(req.params.id);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Bike data retrieved successfully',
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const updateBike = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = Object.assign({}, req.body);
        if (req.body.year)
            payload.year = Number(req.body.year);
        if (req.body.cc)
            payload.cc = Number(req.body.cc);
        if (req.body.pricePerHour)
            payload.pricePerHour = Number(req.body.pricePerHour);
        if (req.body.isAvailable)
            payload.isAvailable = req.body.isAvailable === 'true' ? true : false;
        if (req.file) {
            // cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
            //     resource_type: 'image',
            //     folder: 'bike_images'
            // });
            // payload.img = cloudinaryRes.url;
            const uploadPromise = new Promise((resolve, reject) => {
                var _a;
                const upload_stream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'bike_images'
                }, (error, results) => {
                    if (error) {
                        reject(error);
                        throw new AppError_1.default(400, "Error uploading image");
                    }
                    else {
                        resolve(results);
                    }
                });
                upload_stream.end((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
            });
            const result = yield uploadPromise;
            payload.img = result.url;
        }
        // console.log(payload);
        const result = yield bike_service_1.BikeServices.updateBikesIntoDB(req.params.id, payload);
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
// const postImgToCloudinary = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
//     // potential undefined type error fix
//     if (!req.file || !req.file.path) {
//         return res.status(400).json({
//             success: false,
//             statusCode: 400,
//             message: 'No file selected!',
//         });
//     }
//     // console.log('from controller:', req.file, req.file.path);
//     try {
//         const result = await BikeServices.uploadBikeImgToCloudinaryDB(req.file.path)
//         res.status(httpStatus.OK).json({
//             success: true,
//             statusCode: httpStatus.OK,
//             message: 'Image uploaded to cloudinary server successfully!',
//             data: result
//         })
//     } catch (err) {
//         next(err);
//     }
// }
exports.BikeController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
    // postImgToCloudinary
};
