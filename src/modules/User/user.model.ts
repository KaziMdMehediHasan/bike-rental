import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const UserSchema = new Schema<TUser>({
    name: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true,
        // select: false
    },
    phone: {
        type: "string",
        required: true
    },
    address: {
        type: "string",
    },
    role: {
        type: "string",
        enum: ['admin', 'user'],
        required: true
    }
}, {
    timestamps: true,
    // toJSON: {
    //     transform: function (mongoDBResponse, objectFromMongoDB) {
    //         // const copyOfReturnedObject = { ...objectFromMongoDB }
    //         // delete objectFromMongoDB.password;
    //         const organizedResponse = {
    //             _id: objectFromMongoDB._id,
    //             name: objectFromMongoDB.name,
    //             email: objectFromMongoDB.email,
    //             phone: objectFromMongoDB.phone,
    //             address: objectFromMongoDB.address,
    //             role: objectFromMongoDB.role,
    //             createdAt: objectFromMongoDB.createdAt,
    //             updatedAt: objectFromMongoDB.updatedAt,
    //             __v: objectFromMongoDB.__v
    //         }
    //         return organizedResponse;
    //     }
    // }
})

// hashing the password before saving to the database
UserSchema.pre('save', async function (next) {
    const user = this;
    user.password = await bcrypt.hash(
        user?.password,
        Number(config.bcrypt_salt_rounds)
    )
    next();
})

export const Users = model<TUser>('Users', UserSchema);