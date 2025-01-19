"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = __importDefault(require("./middlewares/globalErrorHandler"));
const notFound_1 = __importDefault(require("./middlewares/notFound"));
const route_1 = __importDefault(require("./route"));
const cloudinary_1 = require("cloudinary");
const corsOptions = {
    origin: '*',
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json({ limit: "200mb" })); //to allow base64 to be uploaded to mongodb database
app.use(express_1.default.urlencoded({ extended: true, limit: "200mb" }));
app.use((0, cors_1.default)(corsOptions));
// Cloudinary configuration
/* eslint-disable no-undef */
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
app.get('/', (req, res) => {
    res.send('Welcome to assignment 3 server');
});
// user routes
app.use('/api', route_1.default);
// app.use('/api/users/me', UserRoutes);
//global error handling middleware
app.use(globalErrorHandler_1.default);
app.use(notFound_1.default);
exports.default = app;
