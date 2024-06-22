"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
// import { userValidation } from "./user.validation";
const http_status_1 = __importDefault(require("http-status"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: result
        });
    }
    catch (err) {
        next(err);
    }
});
const getUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = '';
        // using a type guard to avoid unwanted error
        if (req.user !== undefined) {
            userId = req.user.userId;
        }
        const result = yield user_service_1.UserServices.getUserFromDB(userId);
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User profile retrieved successfully",
            data: result
        });
    }
    catch (err) {
        next(err);
    }
});
const updateUserProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userId = '';
        // using a type guard to avoid unwanted error
        if (req.user !== undefined) {
            userId = req.user.userId;
        }
        if (req.body.password || req.body.role) {
            res.status(http_status_1.default.UNAUTHORIZED).json({
                success: false,
                statusCode: http_status_1.default.UNAUTHORIZED,
                message: 'Request can not be processed'
            });
        }
        else {
            // const updatedUserProfileData = userValidation.userValidationUpdateSchema.parse(req.body);
            const result = yield user_service_1.UserServices.updateUserProfileIntoDB(userId, req.body);
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "Profile updated successfully",
                data: result
            });
        }
    }
    catch (err) {
        next(err);
    }
});
exports.UserControllers = {
    getUserProfile,
    getAllUsers,
    updateUserProfile
};
