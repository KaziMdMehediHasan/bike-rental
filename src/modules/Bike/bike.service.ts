import { TBike } from "./bike.interface";
import { Bikes } from "./bike.model";
// import { v2 as cloudinary } from 'cloudinary';

const createBikeIntoDB = async (payload: TBike) => {
    const result = await Bikes.create(payload);
    return result;
};
const getAllBikesFromDB = async (query: Record<string, unknown>) => {
    let searchTerm = '';
    const duplicateQueryObj = { ...query };
    const bikeSearchFields = ['name', 'brand', 'model'];

    // raw searching & filtering
    if (query?.searchTerm) {
        searchTerm = query?.searchTerm as string;
    }

    const searchQuery = Bikes.find(
        {
            $or: bikeSearchFields.map((field) => ({
                [field]: { $regex: searchTerm, $options: "i" }
            }))
        }
    );

    // filtering

    const excludeFields = ['searchTerm'];

    excludeFields.forEach(item => delete duplicateQueryObj[item]);

    const result = await searchQuery.find(duplicateQueryObj);
    return result;
};

const getSingleBikeFromDB = async (payload: string) => {
    const result = await Bikes.findOne({ _id: payload });
    return result;
};
const updateBikesIntoDB = async (id: string, payload: Partial<TBike>) => {
    const result = Bikes.findByIdAndUpdate(
        { _id: id },
        payload,
        { new: true }
    );
    return result;
};
const deleteBikesFromDB = async (id: string) => {
    const result = Bikes.findByIdAndDelete({ _id: id });
    return result;
};

// const uploadBikeImgToCloudinaryDB = async (payload: string) => {
//     // console.log('From service', payload);
//     const result = await cloudinary.uploader.upload(payload, {
//         folder: 'bike_images'
//     });
//     return result;
// }

export const BikeServices = {
    createBikeIntoDB,
    getAllBikesFromDB,
    getSingleBikeFromDB,
    updateBikesIntoDB,
    deleteBikesFromDB,
    // uploadBikeImgToCloudinaryDB
};