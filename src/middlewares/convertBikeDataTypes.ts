import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../interface";

const convertBikeDataTypes = (req: ExtendedRequest, res: Response, next: NextFunction) => {
    try {
        const { year, cc, isAvailable, ...otherData } = req.body;
        // Convert data types
        req.body = {
            ...otherData,
            year: year ? Number(year) : undefined,            // Convert year to number if provided
            cc: cc ? Number(cc) : undefined,                  // Convert cc to number if provided
            isAvailable: isAvailable === 'false' ? false : true,              // Convert isAvailable to boolean
        };
        next(); // Pass control to the next middleware (validation in this case)
    } catch (error) {
        next(error); // Pass any error to the error handler
    }
};

export default convertBikeDataTypes;
