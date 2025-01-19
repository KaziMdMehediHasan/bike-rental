import express from 'express';
import { UserControllers } from './user.controller';
import { userValidation } from './user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.get('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.getUserProfile);
router.put('/me', auth(USER_ROLE.admin, USER_ROLE.user), UserControllers.updateUserProfile);
router.get('/', auth(USER_ROLE.admin), UserControllers.getAllUsers);
router.put('/:id', auth(USER_ROLE.admin), UserControllers.promoteToAdmin);
router.delete('/:id', validateRequest(userValidation.userValidationUpdateSchema), auth(USER_ROLE.admin), UserControllers.deleteUser);

export const UserRoutes = router;