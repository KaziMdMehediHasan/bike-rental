import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../interface";
import { BikeServices } from "./bike.service";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { v2 as cloudinary } from 'cloudinary';
import { TBike, TCloudinaryRes } from "./bike.interface";

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
    // potential undefined type error fix
    // if (!req.file || !req.file.path) {
    //     return res.status(400).json({
    //         success: false,
    //         statusCode: 400,
    //         message: 'No file selected!',
    //     });
    // }

    // console.log(req.body.bikeData, req.file?.path);
    let imgUrl: string;
    let cloudinaryRes: TCloudinaryRes = {};
    let payload: Partial<TBike> = {};

    // payload = { year: req.body.bikeData, img: req.file?.path }
    // console.log(payload);
    console.log('recieved data in backend:', req.body, req.file);
    // try {
    //     if (req.file?.path) {
    //         const imgUploadResult = await cloudinary.uploader.upload(req.file?.path, {
    //             folder: 'bike_images'
    //         });
    //         cloudinaryRes = { ...imgUploadResult };
    //     }
    //     if (cloudinaryRes) {
    //         imgUrl = cloudinaryRes?.url as string;
    //         payload = { ...req.body.bikeData, img: imgUrl }
    //     }

    //     const result = await BikeServices.updateBikesIntoDB(req.params.id, req.body);
    //     res.status(httpStatus.OK).json({
    //         success: true,
    //         statusCode: httpStatus.OK,
    //         message: "Bike updated successfully",
    //         data: result
    //     });
    // } catch (err) {
    //     next(err);
    // }

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

const postImgToCloudinary = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    // potential undefined type error fix
    if (!req.file || !req.file.path) {
        return res.status(400).json({
            success: false,
            statusCode: 400,
            message: 'No file selected!',
        });
    }
    // console.log('from controller:', req.file, req.file.path);
    try {
        const result = await BikeServices.uploadBikeImgToCloudinaryDB(req.file.path)
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Image uploaded to cloudinary server successfully!',
            data: result
        })
    } catch (err) {
        next(err);
    }

}
export const BikeController = {
    createBike,
    getAllBikes,
    getSingleBike,
    updateBike,
    deleteBike,
    postImgToCloudinary
}