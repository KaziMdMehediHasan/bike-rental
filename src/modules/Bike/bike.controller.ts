import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { BikeServices } from "./bike.service";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { v2 as cloudinary } from 'cloudinary';
import { TBike, TCloudinaryRes } from "./bike.interface";

const createBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const payload: TBike = { ...req.body };

        if (req.body.year) payload.year = Number(req.body.year);
        if (req.body.cc) payload.cc = Number(req.body.cc);
        if (req.body.pricePerHour) payload.pricePerHour = Number(req.body.pricePerHour);
        if (req.body.isAvailable) payload.isAvailable = req.body.isAvailable === 'false' ? false : true;
        if (req.file) {
            const uploadPromise = new Promise((resolve, reject) => {
                const upload_stream = cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'bike_images'
                }, (error, results) => {
                    if (error) {
                        reject(error);
                        throw new AppError(400, "Error uploading image");
                    } else {
                        resolve(results);
                    }
                });
                upload_stream.end(req.file?.buffer);
            });

            const result = await uploadPromise as TCloudinaryRes;

            payload.img = result.url;
        }

        // console.log('final payload');
        const result = await BikeServices.createBikeIntoDB(payload);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike added successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }

};
const getAllBikes = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.getAllBikesFromDB(req.query);
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
};

const getSingleBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const result = await BikeServices.getSingleBikeFromDB(req.params.id);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Bike data retrieved successfully',
            data: result
        });
    } catch (err) {
        next(err);
    }

};

const updateBike = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const payload: Partial<TBike> = { ...req.body };

        if (req.body.year) payload.year = Number(req.body.year);
        if (req.body.cc) payload.cc = Number(req.body.cc);
        if (req.body.pricePerHour) payload.pricePerHour = Number(req.body.pricePerHour);
        if (req.body.isAvailable) payload.isAvailable = req.body.isAvailable === 'true' ? true : false;
        if (req.file) {
            // cloudinaryRes = await cloudinary.uploader.upload(req.file.path, {
            //     resource_type: 'image',
            //     folder: 'bike_images'
            // });
            // payload.img = cloudinaryRes.url;
            const uploadPromise = new Promise((resolve, reject) => {
                const upload_stream = cloudinary.uploader.upload_stream({
                    resource_type: 'image',
                    folder: 'bike_images'
                }, (error, results) => {
                    if (error) {
                        reject(error);
                        throw new AppError(400, "Error uploading image");
                    } else {
                        resolve(results);
                    }
                });
                upload_stream.end(req.file?.buffer);
            });

            const result = await uploadPromise as TCloudinaryRes;

            payload.img = result.url;
        }
        // console.log(payload);
        const result = await BikeServices.updateBikesIntoDB(req.params.id, payload);
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: "Bike updated successfully",
            data: result
        });
    } catch (err) {
        next(err);
    }

};

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

};

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
export const BikeController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
    // postImgToCloudinary
};