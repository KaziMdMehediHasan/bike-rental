import { Request, Response } from "express";
import { AuthServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const result = await AuthServices.loginUserIntoDB(req.body);
}

export const AuthControllers = {
    loginUser
}