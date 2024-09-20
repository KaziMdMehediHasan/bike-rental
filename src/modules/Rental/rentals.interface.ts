import { Types } from "mongoose"

export type TRental = {
    userId: Types.ObjectId;
    bikeId: Types.ObjectId;
    startTime: Date;
    returnTime?: Date | null;
    totalCost?: number;
    isReturned?: boolean;
    advancePaymentId?: string;
    finalPaymentId?: string;
}

