import { z } from 'zod';

const createBikeValidationSchema = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Name is required" }),
        description: z.string().min(1, { message: "Description is required" }),
        pricePerHour: z.number({ required_error: "Price per hour is required" }),
        isAvailable: z.boolean().default(true),
        cc: z.number({ required_error: "CC is required" }),
        year: z.number({ required_error: "Year is required" }),
        model: z.string().min(1, { message: "Model is required" }),
        brand: z.string().min(1, { message: "Brand is required" }),
        img: z.string().optional()
    })

})
const updateBikeValidationSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        pricePerHour: z.number().optional(),
        isAvailable: z.boolean().default(true),
        cc: z.number().optional(),
        year: z.number().optional(),
        model: z.string().optional(),
        brand: z.string().optional(),
    }).optional()

})

export const BikeValidation = {
    createBikeValidationSchema,
    updateBikeValidationSchema
}