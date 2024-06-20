"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsValidations = void 0;
const zod_1 = require("zod");
// const bikeRentValidationSchema = z.object({
//     body: z.object({
//         userId: z.string(),
//         bikeId: z.string(),
//         startTime: z.string().datetime()
//         // returnTime: z.string().datetime().nullable().default(null),
//     })
// })
const bikeRentValidationSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    bikeId: zod_1.z.string(),
    startTime: zod_1.z.string().datetime()
    // returnTime: z.string().datetime().nullable().default(null),
});
// const objectIdSchema = z.instanceof(Types.ObjectId);
// const isoDateString = z.string().refine((val) => !isNaN(Date.parse(val)), {
//     message: "Invalid date format. Must be an ISO string.",
// }).transform((val) => new Date(val));
// const bikeRentValidationSchema = z.object({
//     userId: objectIdSchema,
//     bikeId: objectIdSchema,
//     startTime: isoDateString
//     // returnTime: z.string().datetime().nullable().default(null),
// })
// const bikeRentValidationSchema = z.object({
//     userId: z.string().refine(id => Types.ObjectId.isValid(id), {
//         message: "Invalid userId format",
//     }),
//     bikeId: z.string().refine(id => Types.ObjectId.isValid(id), {
//         message: "Invalid bikeId format",
//     }),
//     startTime: z.string().refine(date => !isNaN(Date.parse(date)), {
//         message: "Invalid date format",
//     })
// });
exports.RentalsValidations = {
    bikeRentValidationSchema
};
