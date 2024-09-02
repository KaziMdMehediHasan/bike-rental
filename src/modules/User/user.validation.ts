import { z } from 'zod';

const createUserValidationSchema = z.object({
    body: z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
        phone: z.string(),
        address: z.string(),
        // role: z.enum(['admin', 'user']).optional()
    })
})
const userValidationUpdateSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        profileImg: z.string().optional(),
    }).optional()
})


export const userValidation = {
    createUserValidationSchema,
    userValidationUpdateSchema
}