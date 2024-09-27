import express from 'express';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.delete('/:id', auth(USER_ROLE.admin), UserControllers.deleteUser);
router.put('/:id', auth(USER_ROLE.admin), UserControllers.promoteToAdmin);
router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getUserProfile);
router.put('/me', validateRequest(userValidation.userValidationUpdateSchema), auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.updateUserProfile);

export const UserRoutes = router;