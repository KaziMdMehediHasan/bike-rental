/* eslint-disable no-undef */
import dotenv from 'dotenv';

dotenv.config();

export default {
    NODE_DEV: process.env.NODE_DEV,
    port: process.env.PORT,
    db_url: process.env.DB_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    stripe_secret: process.env.STRIPE_SECRET_KEY,
    stripe_publishable_key: process.env.STRIPE_PUBLISHABLE_KEY
}