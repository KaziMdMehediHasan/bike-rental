import express from 'express';
import { UserRoutes } from './modules/User/user.route';
import cors from 'cors';

const app = express();

// parsers
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// user routes
app.use('/api/auth', UserRoutes);
app.use('/api/users/me', UserRoutes);

export default app;