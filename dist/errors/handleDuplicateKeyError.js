"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateKeyError = (err) => {
    // const match = err?.message.match(/"([^"]*)"/);
    // const extractedMessage = match && match[1];
    const errorMessages = [
        {
            path: '',
            message: err === null || err === void 0 ? void 0 : err.message
        }
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: err === null || err === void 0 ? void 0 : err.message,
        errorMessages
    };
};
exports.default = handleDuplicateKeyError;
