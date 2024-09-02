import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BikeController } from './bike.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';

const router = express.Router();

router.post("/", validateRequest(BikeValidation.createBikeValidationSchema), auth(USER_ROLE.admin), BikeController.createBike)
router.get("/", BikeController.getAllBikes);
router.get("/:id", BikeController.getSingleBike);
router.put("/:id", validateRequest(BikeValidation.updateBikeValidationSchema), auth(USER_ROLE.admin), BikeController.updateBike);
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike);

export const BikeRoutes = router;