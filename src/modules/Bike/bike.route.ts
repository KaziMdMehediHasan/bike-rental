import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { upload } from '../../middlewares/multer-config';
// import convertBikeDataTypes from '../../middlewares/convertBikeDataTypes';

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), upload.single('img'), BikeController.createBike)
// validateRequest(BikeValidation.createBikeValidationSchema), auth(USER_ROLE.admin), BikeController.createBike
router.get("/", BikeController.getAllBikes);
router.get("/:id", BikeController.getSingleBike);
router.put("/:id", validateRequest(BikeValidation.updateBikeValidationSchema), auth(USER_ROLE.admin), upload.single('img'),
    BikeController.updateBike);
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike);
// router.post("/upload", auth(USER_ROLE.admin), upload.single('img'), BikeController.postImgToCloudinary);

export const BikeRoutes = router;