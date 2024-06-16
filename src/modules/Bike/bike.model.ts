import { Schema, model } from "mongoose";
import { TBike } from "./bike.interface";

const createBikeSchema = new Schema<TBike>({
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
    model: {
        type: "string",
        required: true
    },
    brand: {
        type: "string",
        required: true
    }
}, { versionKey: false })

export const Bikes = model<TBike>('Bikes', createBikeSchema);