import express from "express";
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';
import { PaymentController } from "./payment.controller";


const router = express.Router();

router.post('/advance-payment', auth(USER_ROLE.user), PaymentController.createPaymentIntent);

export const PaymentRoutes = router;