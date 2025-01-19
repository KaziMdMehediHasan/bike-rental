"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_constant_1 = require("../User/user.constant");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const payment_controller_1 = require("./payment.controller");
const router = express_1.default.Router();
router.post('/advance-payment', (0, auth_1.default)(user_constant_1.USER_ROLE.user), payment_controller_1.PaymentController.createPaymentIntent);
exports.PaymentRoutes = router;
