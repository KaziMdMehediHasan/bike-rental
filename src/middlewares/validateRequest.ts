import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../interface";
import { AnyZodObject } from "zod";

const validateRequest = (schema: AnyZodObject) => {
    return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body
            })
            next();
        } catch (err) {
            next(err);
        }
    }
}

export default validateRequest;