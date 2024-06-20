import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { ExtendedRequest } from "../interface";
import { TUserRole } from "../modules/User/user.interface";
import AppError from "../errors/AppError";
import httpStatus from "http-status";


const auth = (...requiredRoles: TUserRole[]) => {
    return async (req: ExtendedRequest, res: Response, next: NextFunction) => {
        try {
            const token = req.headers.authorization;
            // check if the token is sent by the client
            if (!token) {
                throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
            }
            // check if the token is valid
            jwt.verify(token, config.jwt_access_secret as string, function (err, decoded) {
                // err
                if (err) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
                }
                const role = (decoded as JwtPayload).role;

                if (requiredRoles && !requiredRoles.includes(role)) {
                    throw new AppError(httpStatus.UNAUTHORIZED, "You have no access to this route");
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