"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rentals = void 0;
const mongoose_1 = require("mongoose");
// const dateValidator = (val: Date) => {
//     if (typeof val !== 'object') {
//         throw new Error(`Invalid date format. Input ISO string date : YY-MM-DDTHH:MM:SSZ`)
//     }
//     const compatibleDateFormat = val.toISOString().replace('.000Z', 'Z');
//     const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|30)T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])Z$/;
//     console.log(regex.test(compatibleDateFormat));
//     return regex.test(compatibleDateFormat);
// }
const BikeRentalSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Users",
        required: true
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    },
    advancePaymentId: {
        type: "string"
    },
    finalPaymentId: {
        type: "string",
        default: ''
    }
}, {
    versionKey: false
});
exports.Rentals = (0, mongoose_1.model)('Rentals', BikeRentalSchema);
