import { TUser } from "./user.interface";
import { Users } from "./user.model";


const getAllUsersFromDB = async () => {
    const users = await Users.find({}).select("-password");
    return users;
}

const deleteUserFromDB = async (id: string) => {
    const user = await Users.findByIdAndDelete({ _id: id });
    return user;
}

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

const makeUserAdmin = async (id: string) => {
    const result = await Users.findByIdAndUpdate(
        { _id: id },
        { $set: { role: "admin" } },
        { new: true }
    ).select("-password -createdAt -updatedAt -__v");
    return result;
}
export const UserServices = {
    getUserFromDB,
    deleteUserFromDB,
    updateUserProfileIntoDB,
    getAllUsersFromDB,
    makeUserAdmin
}