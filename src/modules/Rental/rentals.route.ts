import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// import { RentalsValidations } from './rentals.validation';
import { RentalsControllers } from './rentals.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

// router.post('/', validateRequest(RentalsValidations.bikeRentValidationSchema), auth(USER_ROLE.admin, USER_ROLE.user), RentalsControllers.rentBike);
router.get('/', auth(USER_ROLE.admin, USER_ROLE.user), RentalsControllers.getAllRentals);
router.post('/', auth(USER_ROLE.admin, USER_ROLE.user), RentalsControllers.rentBike);
router.put('/:id/return', auth(USER_ROLE.admin, USER_ROLE.user), RentalsControllers.returnBike);
export const RentalsRoutes = router;