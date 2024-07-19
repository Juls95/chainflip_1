// backend/src/index.ts
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { ChainflipSDK } from '@chainflip/sdk';
import transactionRoutes from './routes/transactionRoutes';

app.use('/api', transactionRoutes);
const app = express();
const port = 3001;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/travel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const chainflip = new ChainflipSDK({
    apiKey: 'YOUR_API_KEY',
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});