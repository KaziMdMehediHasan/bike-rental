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
exports.AuthServices = void 0;
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../User/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createNewUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log('from auth service:', payload);
    const result = yield user_model_1.Users.create(payload);
    return result;
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user exists
    const isUserExist = yield user_model_1.Users.findOne({ email: payload.email });
    // console.log(isUserExist);
    if (!isUserExist) {
        throw new Error('User does not exist');
    }
    // checking if the password matches
    // console.log(isUserExist?.password);
    const isPasswordMatch = yield bcrypt_1.default.compare(payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    // console.log(isPasswordMatch);
    if (!isPasswordMatch) {
        throw new Error('Password does not match');
    }
    // creating a json web token and send to the client
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        userEmail: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_secret, { expiresIn: '30d' });
    // optimizing the response
    const desiredUserData = {
        _id: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist._id,
        name: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.name,
        email: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.email,
        phone: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.phone,
        address: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.address,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role
    };
    return {
        accessToken, desiredUserData
    };
});
exports.AuthServices = {
    createNewUserIntoDB,
    loginUserIntoDB
};
