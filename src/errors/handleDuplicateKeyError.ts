
import { TErrorMessages } from "../interface/error";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateKeyError = (err: any) => {
    // const match = err?.message.match(/"([^"]*)"/);
    // const extractedMessage = match && match[1];
    const errorMessages: TErrorMessages = [
        {
            path: '',
            message: err?.message
        }
    ]

    const statusCode = 400;
    return {
        statusCode,
        message: err?.message,
        errorMessages
    }
}

export default handleDuplicateKeyError;