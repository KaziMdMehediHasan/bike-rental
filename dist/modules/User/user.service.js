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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.Users.find({}).select("-password");
    return users;
});
const deleteUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.Users.findByIdAndDelete({ _id: id });
    return user;
});
const getUserFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield user_model_1.Users.findById({ _id: payload }).select("-password");
    return profile;
});
const updateUserProfileIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findOneAndUpdate({ _id: id }, payload, { new: true }).select("-password -createdAt -updatedAt -__v");
    return result;
});
const makeUserAdmin = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.Users.findByIdAndUpdate({ _id: id }, { $set: { role: "admin" } }, { new: true }).select("-password -createdAt -updatedAt -__v");
    return result;
});
exports.UserServices = {
    getUserFromDB,
    deleteUserFromDB,
    updateUserProfileIntoDB,
    getAllUsersFromDB,
    makeUserAdmin
};
