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
exports.BikeServices = void 0;
const bike_model_1 = require("./bike.model");
// import { v2 as cloudinary } from 'cloudinary';
const createBikeIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bikes.create(payload);
    return result;
});
const getAllBikesFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    let searchTerm = '';
    const duplicateQueryObj = Object.assign({}, query);
    const bikeSearchFields = ['name', 'brand', 'model'];
    // raw searching & filtering
    if (query === null || query === void 0 ? void 0 : query.searchTerm) {
        searchTerm = query === null || query === void 0 ? void 0 : query.searchTerm;
    }
    const searchQuery = bike_model_1.Bikes.find({
        $or: bikeSearchFields.map((field) => ({
            [field]: { $regex: searchTerm, $options: "i" }
        }))
    });
    // filtering
    const excludeFields = ['searchTerm'];
    excludeFields.forEach(item => delete duplicateQueryObj[item]);
    const result = yield searchQuery.find(duplicateQueryObj);
    return result;
});
const getSingleBikeFromDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_model_1.Bikes.findOne({ _id: payload });
    return result;
});
const updateBikesIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = bike_model_1.Bikes.findByIdAndUpdate({ _id: id }, payload, { new: true });
    return result;
});
const deleteBikesFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = bike_model_1.Bikes.findByIdAndDelete({ _id: id });
    return result;
});
// const uploadBikeImgToCloudinaryDB = async (payload: string) => {
//     // console.log('From service', payload);
//     const result = await cloudinary.uploader.upload(payload, {
//         folder: 'bike_images'
//     });
//     return result;
// }
exports.BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    getSingleBikeFromDB,
    updateBikesIntoDB,
    deleteBikesFromDB,
    // uploadBikeImgToCloudinaryDB
};
