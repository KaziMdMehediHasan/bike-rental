import express from 'express';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.get('/users', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.get('/users/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getUserProfile);
router.put('/users/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.updateUserProfile);
router.post('/auth/signup', UserControllers.createNewUser);
router.post('/auth/login', UserControllers.loginUser);

export const UserRoutes = router;