import mongoose from "mongoose";
import { TErrorMessages } from "../interface/error"

const handleMongooseError = (err: mongoose.Error.ValidationError) => {
    const errorMessages: TErrorMessages = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
            path: val?.path,
            message: val?.message
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation error',
        errorMessages
    }
}

export default handleMongooseError;