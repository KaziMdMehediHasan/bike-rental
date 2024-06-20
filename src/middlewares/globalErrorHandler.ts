/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorMessages } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleMongooseError from "../errors/handleMongooseValidationError";
import httpStatus from "http-status";
import handleCastError from "../errors/handleCastError";
import handleDuplicateKeyError from "../errors/handleDuplicateKeyError";


const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

    // setting default values
    let statusCode = 500;
    let message = err.message || 'Something went wrong';

    let errorMessages: TErrorMessages = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]

    // handling zod error
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    // handling mongoose validation Error
    else if (err?.name === 'ValidationError') {
        const simplifiedError = handleMongooseError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    // handling mongoose cast error
    else if (err?.name === 'CastError') {
        const simplifiedError = handleCastError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages;
    }
    // handling auth permission error
    else if (err?.code === 401) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: message
        })
    }
    // 11000 error handling
    else if (err?.code === 11000) {
        const simplifiedError = handleDuplicateKeyError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorMessages = simplifiedError?.errorMessages
    }
    // // handling error in case no matched data is found
    else if (err?.code === 204) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'No data found',
            data: []
        })
    }

    // handling mongoose error
    // final return
    return res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages,
        // err,
        stack: config.NODE_DEV === 'development' ? err?.stack : null
    })
}


export default globalErrorHandler;

//pattern
/*
success
message
errorSources:[
path: '',
message: ''
]
stack
*/