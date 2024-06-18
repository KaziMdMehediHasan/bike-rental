import { Schema, model } from "mongoose";
import { TRental } from "./rentals.interface";


// const dateValidator = (val: Date) => {
//     if (typeof val !== 'object') {
//         throw new Error(`Invalid date format. Input ISO string date : YY-MM-DDTHH:MM:SSZ`)
//     }
//     const compatibleDateFormat = val.toISOString().replace('.000Z', 'Z');
//     const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|30)T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z$/;
//     console.log(regex.test(compatibleDateFormat));
//     return regex.test(compatibleDateFormat);
// }

const BikeRentalSchema = new Schema<TRental>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    bikeId: {
        type: Schema.Types.ObjectId,
        ref: "Bikes",
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        // validate: [dateValidator, 'The date must be in ISO string format : YY-MM-DDTHH:MM:SSZ']
    },
    returnTime: {
        type: Date,
        default: null,
    },
    totalCost: {
        type: "number",
        default: 0
    },
    isReturned: {
        type: "boolean",
        default: false
    }
}, {
    versionKey: false
})

export const Rentals = model<TRental>('Rentals', BikeRentalSchema);