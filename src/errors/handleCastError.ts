import mongoose from "mongoose";
import { TErrorMessages } from "../interface/error";

const handleCastError = (err: mongoose.Error.CastError) => {
    const statusCode = 400;
    const errorMessages: TErrorMessages = [
        {
            path: err?.path,
            message: err?.message
        }
    ]
    return {
        statusCode,
        message: 'Invalid ID',
        errorMessages
    }
}

export default handleCastError;