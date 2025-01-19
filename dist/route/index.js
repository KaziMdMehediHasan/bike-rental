"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = require("../modules/User/user.route");
const bike_route_1 = require("../modules/Bike/bike.route");
const auth_route_1 = require("../modules/Auth/auth.route");
const rentals_route_1 = require("../modules/Rental/rentals.route");
const payment_route_1 = require("../modules/Payment/payment.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_route_1.UserRoutes
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/bikes',
        route: bike_route_1.BikeRoutes
    },
    {
        path: '/rentals',
        route: rentals_route_1.RentalsRoutes
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRoutes,
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
