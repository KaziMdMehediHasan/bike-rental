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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const formatToken_1 = __importDefault(require("../utils/formatToken"));
const auth = (...requiredRoles) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization;
            const formattedToken = (0, formatToken_1.default)(token);
            // check if the token is sent by the client
            if (!formattedToken) {
                throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
            }
            // check if the token is valid
            jsonwebtoken_1.default.verify(formattedToken, config_1.default.jwt_access_secret, function (err, decoded) {
                // err
                if (err) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
                }
                const role = decoded.role;
                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError_1.default(http_status_1.default.UNAUTHORIZED, "You have no access to this route");
                }
                // decoded undefined
                // console.log(decoded);
                // const { userEmail, role } = decoded;
                req.user = decoded;
                next();
            });
        }
        catch (err) {
            next(err);
        }
    });
};
exports.default = auth;
