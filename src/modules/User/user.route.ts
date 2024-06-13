import express from 'express';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';

const router = express.Router();

router.get('/', UserControllers.getUser);
router.post('/signup', UserControllers.createNewUser);

export const UserRoutes = router;