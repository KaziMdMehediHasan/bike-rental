"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeValidation = void 0;
const zod_1 = require("zod");
const createBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: "Name is required" }),
        description: zod_1.z.string().min(1, { message: "Description is required" }),
        pricePerHour: zod_1.z.number({ required_error: "Price per hour is required" }),
        isAvailable: zod_1.z.boolean().default(true),
        cc: zod_1.z.number({ required_error: "CC is required" }),
        year: zod_1.z.number({ required_error: "Year is required" }),
        model: zod_1.z.string().min(1, { message: "Model is required" }),
        brand: zod_1.z.string().min(1, { message: "Brand is required" }),
        img: zod_1.z.string()
    })
});
const updateBikeValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        pricePerHour: zod_1.z.number().optional(),
        isAvailable: zod_1.z.boolean().default(true),
        cc: zod_1.z.number().optional(),
        year: zod_1.z.number().optional(),
        model: zod_1.z.string().optional(),
        brand: zod_1.z.string().optional(),
    }).optional()
});
exports.BikeValidation = {
    createBikeValidationSchema,
    updateBikeValidationSchema
};
