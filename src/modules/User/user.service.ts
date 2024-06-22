import { TUser } from "./user.interface";
import { Users } from "./user.model";


// const getAllUsersFromDB = async () => {
//     const users = await Users.find({}).select("-password");
//     return users;
// }
const getUserFromDB = async (payload: string) => {
    const profile = await Users.findById({ _id: payload }).select("-password");
    return profile;
}
const updateUserProfileIntoDB = async (id: string, payload: Partial<TUser>) => {
    // console.log(id, payload);
    const result = await Users.findOneAndUpdate(
        { _id: id },
        payload,
        { new: true }
    ).select("-password -createdAt -updatedAt -__v");
    return result;
}

export const UserServices = {
    getUserFromDB,
    updateUserProfileIntoDB
}