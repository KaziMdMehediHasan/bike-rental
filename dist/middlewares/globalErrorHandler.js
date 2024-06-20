"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleMongooseValidationError_1 = __importDefault(require("../errors/handleMongooseValidationError"));
const http_status_1 = __importDefault(require("http-status"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateKeyError_1 = __importDefault(require("../errors/handleDuplicateKeyError"));
const globalErrorHandler = (err, req, res, next) => {
    // setting default values
    let statusCode = 500;
    let message = err.message || 'Something went wrong';
    let errorMessages = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ];
    // handling zod error
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    // handling mongoose validation Error
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplifiedError = (0, handleMongooseValidationError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    // handling mongoose cast error
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplifiedError = (0, handleCastError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    // handling auth permission error
    else if ((err === null || err === void 0 ? void 0 : err.code) === 401) {
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: message
        });
    }
    // 11000 error handling
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateKeyError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorMessages = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorMessages;
    }
    // // handling error in case no matched data is found
    else if ((err === null || err === void 0 ? void 0 : err.code) === 204) {
        return res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'No data found',
            data: []
        });
    }
    // handling mongoose error
    // final return
    return res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages,
        // err,
        stack: config_1.default.NODE_DEV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null
    });
};
exports.default = globalErrorHandler;
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
