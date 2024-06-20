"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BikeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_constant_1 = require("../User/user.constant");
const bike_controller_1 = require("./bike.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const bike_validation_1 = require("./bike.validation");
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(bike_validation_1.BikeValidation.createBikeValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), bike_controller_1.BikeController.createBike);
router.get("/", bike_controller_1.BikeController.getAllBikes);
router.put("/:id", (0, validateRequest_1.default)(bike_validation_1.BikeValidation.updateBikeValidationSchema), (0, auth_1.default)(user_constant_1.USER_ROLE.admin), bike_controller_1.BikeController.updateBike);
router.delete("/:id", (0, auth_1.default)(user_constant_1.USER_ROLE.admin), bike_controller_1.BikeController.deleteBike);
exports.BikeRoutes = router;
