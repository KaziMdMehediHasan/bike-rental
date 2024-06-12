import express from 'express';

const app = express();

const a = 30;
app.get('/', (req, res) => {
    res.send('Hello World!')
})

export default app;