import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import { BikeController } from './bike.controller';

const router = express.Router();

router.post("/", auth(USER_ROLE.admin), BikeController.createBike)
router.get("/", BikeController.getAllBikes);
router.put("/:id", auth(USER_ROLE.admin), BikeController.updateBike);
router.delete("/:id", auth(USER_ROLE.admin), BikeController.deleteBike);

export const BikeRoutes = router;