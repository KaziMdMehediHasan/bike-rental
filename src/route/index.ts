import express from 'express';
import { UserRoutes } from '../modules/User/user.route';
import { BikeRoutes } from '../modules/Bike/bike.route';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { RentalsRoutes } from '../modules/Rental/rentals.route';

const router = express.Router();


const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/bikes',
        route: BikeRoutes
    },
    {
        path: '/rentals',
        route: RentalsRoutes
    }
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router;