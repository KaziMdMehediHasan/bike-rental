import { z } from 'zod';

const createUserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user'])
})
const userValidationUpdateSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    // password: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    // role: z.enum(['admin', 'user']).optional()
})

const loginValidationSchema = z.object({
    email: z.string({
        required_error: "Email must be provided"
    }),
    password: z.string({
        required_error: "Password must be provided"
    }),
})

export const userValidation = {
    createUserValidationSchema,
    loginValidationSchema,
    userValidationUpdateSchema
}