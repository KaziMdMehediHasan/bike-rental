import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { ExtendedRequest } from "../interface";
import { TUserRole } from "../modules/User/user.interface";


const auth = (...requiredRoles: TUserRole[]) => {
    return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // check if the token is sent by the client
            if (!token) {
                throw new Error(`Unauthorized user`);
            }
            // check if the token is valid
            jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
                // err
                if (err) {
                    throw new Error('Unauthorized user')
                }
                const role = (decoded as JwtPayload).role;

                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new Error(`Incorrect Role`);
                }
                // decoded undefined
                // console.log(decoded);
                // const { userEmail, role } = decoded;
                req.user = decoded as JwtPayload;
                next();
            });
        } catch (err) {
            next(err);
        }
    }

}

export default auth;