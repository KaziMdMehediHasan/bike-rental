import { TUser } from "./user.interface";
import { Users } from "./user.model";

const getUserFromDB = async () => {
    console.log('From user service');
    return await `User Route is hit`;
}

const createNewUserIntoDB = async (payload: TUser) => {
    const result = await Users.create(payload);
    return result;
}
export const UserServices = {
    getUserFromDB,
    createNewUserIntoDB
}