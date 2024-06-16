import express from 'express';
import { UserRoutes } from './modules/User/user.route';
import cors from 'cors';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
import router from './route';

const app = express();

// parsers
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// user routes
app.use('/api', router);
// app.use('/api/users/me', UserRoutes);

//global error handling middleware

app.use(globalErrorHandler);
app.use(notFound);
export default app;