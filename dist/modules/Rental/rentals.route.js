"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsRoutes = void 0;
const express_1 = __importDefault(require("express"));
// import validateRequest from '../../middlewares/validateRequest';
// import { RentalsValidations } from './rentals.validation';
const rentals_controller_1 = require("./rentals.controller");
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
// router.post('/', validateRequest(RentalsValidations.bikeRentValidationSchema), auth(USER_ROLE.admin, USER_ROLE.user), RentalsControllers.rentBike);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), rentals_controller_1.RentalsControllers.getAllRentals);
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), rentals_controller_1.RentalsControllers.rentBike);
router.put('/:id/return', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), rentals_controller_1.RentalsControllers.returnBike);
exports.RentalsRoutes = router;
