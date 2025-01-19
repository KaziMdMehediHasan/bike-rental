"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
// initializing stripe with secret key
const stripe = new stripe_1.default(config_1.default.stripe_secret, { apiVersion: "2024-06-20" });
// create payment intent
const createPaymentIntent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    try {
        // creating a payment intent with $10 charge
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: amount * 100, //stripe calculates the payment in cents
            currency: 'USD',
            payment_method_types: ['card']
        });
        if (!paymentIntent) {
            throw new AppError_1.default(http_status_1.default.NOT_IMPLEMENTED, 'Payment creation unsuccessful');
        }
        res.status(http_status_1.default.OK).json({
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Payment created successfully',
            clientSecret: paymentIntent.client_secret,
            paymentId: paymentIntent.id
        });
    }
    catch (err) {
        next(err);
    }
});
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
exports.PaymentController = {
    createPaymentIntent,
    // confirmPayment
};
