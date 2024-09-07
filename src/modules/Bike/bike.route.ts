import express, { NextFunction, Response } from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { upload } from '../../middlewares/multer-config';
import { ExtendedRequest } from '../../interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const router = express.Router();

router.post("/", validateRequest(BikeValidation.createBikeValidationSchema), auth(USER_ROLE.admin), BikeController.createBike)
router.get("/", BikeController.getAllBikes);
router.get("/:id", BikeController.getSingleBike);
router.put("/:id", validateRequest(BikeValidation.updateBikeValidationSchema), auth(USER_ROLE.admin), upload.single('img'),
    // (req: ExtendedRequest, res: Response, next: NextFunction) => {
    //     if (req.body?.cc || req.body?.year) {
    //         if (req.body?.year) req.body = { ...req.body, year: Number(req.body.year) };
    //         if (req.body?.cc) req.body = { ...req.body, cc: Number(req.body.cc) };
    //         console.log('coming from middleware:', req.body);
    //         next();
    //     } else {
    //         throw new AppError(httpStatus.BAD_REQUEST, "Please provide user data");
    //     }
    // },
    BikeController.updateBike);
// validateRequest(BikeValidation.updateBikeValidationSchema)
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike);
router.post("/upload", auth(USER_ROLE.admin), upload.single('img'), BikeController.postImgToCloudinary);

export const BikeRoutes = router;