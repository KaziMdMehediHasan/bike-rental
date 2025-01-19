"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("./user.constant");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.get('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), user_controller_1.UserControllers.getUserProfile);
router.put('/me', (0, auth_1.default)(user_constant_1.USER_ROLE.admin, user_constant_1.USER_ROLE.user), user_controller_1.UserControllers.updateUserProfile);
router.get('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.getAllUsers);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.promoteToAdmin);
router.delete('/:id', (0, validateRequest_1.default)(user_validation_1.userValidation.userValidationUpdateSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), user_controller_1.UserControllers.deleteUser);
exports.UserRoutes = router;
