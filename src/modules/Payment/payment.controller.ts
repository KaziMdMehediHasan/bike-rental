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
            amount: amount * 100,
            currency: 'USD',
            payment_method_types: ['card']
        });

        if (!paymentIntent) {
            throw new AppError(httpStatus.NOT_IMPLEMENTED, 'Payment creation unsuccessful')
        }
        // console.log(paymentIntent);
        // const paymentIntentStatus = await stripe.paymentIntents.retrieve(paymentIntent.client)
        res.status(httpStatus.OK).json({
            success: true,
            statusCode: httpStatus.OK,
            message: 'Payment created successfully',
            data: paymentIntent
        });
    } catch (err) {
        next(err);
    }
}

export const PaymentController = {
    createPaymentIntent
}