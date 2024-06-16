import { TBike } from "./bike.interface";
import { Bikes } from "./bike.model";
import { BikeValidation } from "./bike.validation";


const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bikes.create(payload);
    return result;
}
const getAllBikesFromDB = async () => {
    const result = await Bikes.find();
    return result;
}
const updateBikesIntoDB = async (id: string, payload: Partial<TBike>) => {
    const validateBikeUpdateData = BikeValidation.updateBikeValidationSchema.parse(payload);
    const result = Bikes.findByIdAndUpdate(
        { _id: id },
        validateBikeUpdateData,
        { new: true }
    )
    return result;
}
const deleteBikesFromDB = async (id: string) => {
    const result = Bikes.findByIdAndDelete({ _id: id })
    return result;
}


export const BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    updateBikesIntoDB,
    deleteBikesFromDB
}