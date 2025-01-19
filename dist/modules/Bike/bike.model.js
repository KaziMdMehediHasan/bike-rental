"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bikes = void 0;
const mongoose_1 = require("mongoose");
const createBikeSchema = new mongoose_1.Schema({
    name: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    pricePerHour: {
        type: "number",
        required: true
    },
    isAvailable: {
        type: "boolean",
        default: true
    },
    cc: {
        type: "number",
        required: true
    },
    year: {
        type: "number",
        required: true
    },
    model: {
        type: "string",
        required: true
    },
    brand: {
        type: "string",
        required: true
    },
    img: {
        type: "string",
    }
}, { versionKey: false });
exports.Bikes = (0, mongoose_1.model)('Bikes', createBikeSchema);
