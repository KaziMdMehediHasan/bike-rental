import express from 'express';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './route';
import { v2 as cloudinary } from 'cloudinary';

const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}
const app = express();

// parsers
app.use(express.json({ limit: "200mb" })); //to allow base64 to be uploaded to mongodb database
app.use(express.urlencoded({ extended: true, limit: "200mb" }));
app.use(cors(corsOptions));

// Cloudinary configuration
/* eslint-disable no-undef */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/', (req, res) => {
    res.send('Welcome to assignment 3 server')
})

// user routes
app.use('/api', router);
// app.use('/api/users/me', UserRoutes);

//global error handling middleware

app.use(globalErrorHandler);
app.use(notFound);
export default app;