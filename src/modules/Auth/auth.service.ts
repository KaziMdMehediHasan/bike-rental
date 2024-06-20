import config from "../../config";
import { TUser } from "../User/user.interface";
import { Users } from "../User/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const createNewUserIntoDB = async (payload: TUser) => {
    const result = await Users.create(payload);
    return result;
}

const loginUserIntoDB = async (payload: TLoginUser) => {
    // checking if the user exists
    const isUserExist = await Users.findOne(
        { email: payload.email }
    )
    // console.log(isUserExist);

    if (!isUserExist) {
        throw new Error('User does not exist');
    }

    // checking if the password matches
    // console.log(isUserExist?.password);
    const isPasswordMatch = await bcrypt.compare(payload.password, isUserExist?.password);
    // console.log(isPasswordMatch);
    if (!isPasswordMatch) {
        throw new Error('Password does not match');
    }

    // creating a json web token and send to the client
    const jwtPayload = {
        userId: isUserExist?._id,
        userEmail: isUserExist?.email,
        role: isUserExist?.role
    }
    const accessToken = jwt.sign(
        jwtPayload,
        config.jwt_access_secret as string, { expiresIn: '30d' });

    // optimizing the response
    const desiredUserData = {
        _id: isUserExist?._id,
        name: isUserExist?.name,
        email: isUserExist?.email,
        phone: isUserExist?.phone,
        address: isUserExist?.address,
        role: isUserExist?.role
    }

    return {
        accessToken, desiredUserData
    }

}
export const AuthServices = {
    createNewUserIntoDB,
    loginUserIntoDB
}