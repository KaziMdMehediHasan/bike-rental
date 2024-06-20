import { TBike } from "./bike.interface";
import { Bikes } from "./bike.model";


const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bikes.create(payload);
    return result;
}
const getAllBikesFromDB = async () => {
    const result = await Bikes.find();
    return result;
}
const updateBikesIntoDB = async (id: string, payload: Partial<TBike>) => {
    const result = Bikes.findByIdAndUpdate(
        { _id: id },
        payload,
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