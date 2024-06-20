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
exports.Users = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const UserSchema = new mongoose_1.Schema({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        unique: true,
        required: true
    },
    password: {
        type: "string",
        required: true,
        // select: false
    },
    phone: {
        type: "string",
        required: true
    },
    address: {
        type: "string",
    },
    role: {
        type: "string",
        enum: ['admin', 'user'],
        required: true
    }
}, {
    timestamps: true,
    // toJSON: {
    //     transform: function (mongoDBResponse, objectFromMongoDB) {
    //         // const copyOfReturnedObject = { ...objectFromMongoDB }
    //         // delete objectFromMongoDB.password;
    //         const organizedResponse = {
    //             _id: objectFromMongoDB._id,
    //             name: objectFromMongoDB.name,
    //             email: objectFromMongoDB.email,
    //             phone: objectFromMongoDB.phone,
    //             address: objectFromMongoDB.address,
    //             role: objectFromMongoDB.role,
    //             createdAt: objectFromMongoDB.createdAt,
    //             updatedAt: objectFromMongoDB.updatedAt,
    //             __v: objectFromMongoDB.__v
    //         }
    //         return organizedResponse;
    //     }
    // }
});
//checking if there's already an existing user with the same email
// UserSchema.pre('save', async function (next) {
//     const isUserExist = await Users.findOne({ email: this.email });
//     if (isUserExist) {
//         throw new AppError(httpStatus.NOT_ACCEPTABLE, 'A user with the same email already exists');
//     }
//     next();
// })
// hashing the password before saving to the database
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        user.password = yield bcrypt_1.default.hash(user === null || user === void 0 ? void 0 : user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.Users = (0, mongoose_1.model)('Users', UserSchema);
