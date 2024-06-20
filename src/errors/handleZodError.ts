import { ZodError, ZodIssue } from "zod";
import { TErrorMessages } from "../interface/error";

const handleZodError = (err: ZodError) => {
    const errorMessages: TErrorMessages = err.issues.map((issue: ZodIssue) => {
        return {
            path: issue?.path[issue.path.length - 1],
            message: issue?.message
        }
    })
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages
    }
}

export default handleZodError;