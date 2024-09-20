import Stripe from "stripe";
import config from "../../config";
import { ExtendedRequest } from "../../interface";
import { NextFunction, Response } from "express";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// initializing stripe with secret key
const stripe = new Stripe(config.stripe_secret as string, { apiVersion: "2024-06-20" });

// create payment intent

const createPaymentIntent = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
    const { amount } = req.body;
    try {
        // creating a payment intent with $10 charge
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount * 100, //stripe calculates the payment in cents
            currency: 'USD',
            payment_method_types: ['card']
        });

        if (!paymentIntent) {
            throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Payment creation unsuccessful');
        }
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Payment created successfully',
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id
        });
    } catch (err) {
        next(err);
    }
}

// confirm the payment
// const confirmPayment = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
//     const { paymentId } = req.body;
//     try {
//         // retrieve payment intent to confirm it's successful
//         const confirmation = await stripe.paymentIntents.retrieve(paymentId);
//         if (confirmation.status === 'succeeded') {
//             res.status(httpStatus.OK).json({
//                 success: true,
//                 statusCode: httpStatus.OK,
//                 message: 'Payment confirmed successfully',
//                 data: confirmation
//             })
//         }
//     } catch (err) {
//         next(err);
//     }
// }

export const PaymentController = {
    createPaymentIntent,
    // confirmPayment
}