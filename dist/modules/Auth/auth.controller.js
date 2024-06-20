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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const auth_service_1 = require("./auth.service");
const http_status_1 = __importDefault(require("http-status"));
const createNewUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const validatedUserData = userValidation.createUserValidationSchema.parse(req.body);
        const result = yield auth_service_1.AuthServices.createNewUserIntoDB(req.body);
        const responseObject = result.toObject();
        const copiedResponse = Object.assign({}, responseObject);
        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
        const { password } = copiedResponse, rest = __rest(copiedResponse, ["password"]);
        // sending an optimized response that doesn't expose the password to anyone
        const optimizedResponse = {
            _id: rest._id,
            name: rest.name,
            email: rest.email,
            phone: rest.phone,
            address: rest.address,
            role: rest.role,
            createdAt: rest.createdAt,
            updatedAt: rest.updatedAt,
            __v: rest.__v
        };
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User registered successfully",
            data: optimizedResponse
        });
    }
    catch (err) {
        next(err);
    }
});
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const validatedCredentials = userValidation.loginValidationSchema.parse(req.body);
        const result = yield auth_service_1.AuthServices.loginUserIntoDB(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'User logged in successfully',
            token: result.accessToken,
            data: result.desiredUserData
        });
    }
    catch (err) {
        next(err);
    }
});
exports.AuthControllers = {
    createNewUser,
    loginUser
};
