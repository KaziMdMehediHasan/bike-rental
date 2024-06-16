import express from 'express';
import { UserControllers } from '../User/user.controller';

const router = express.Router();

router.post('/signup', UserControllers.createNewUser);
router.post('/login', UserControllers.loginUser);

export const AuthRoutes = router;