import { z } from 'zod';

const createUserValidationSchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
    phone: z.string(),
    address: z.string(),
    role: z.enum(['admin', 'user'])
})

export const userValidation = {
    createUserValidationSchema
}