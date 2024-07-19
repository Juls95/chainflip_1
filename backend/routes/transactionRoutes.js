// backend/src/routes/transactionRoutes.ts
import express from 'express';
import { Transaction } from '../models/Transaction';

const router = express.Router();

// backend/src/routes/transactionRoutes.ts
router.post('/transaction', async (req, res) => {
    const { ethAddress, btcAddress, amount } = req.body;
    const transaction = new Transaction({ ethAddress, btcAddress, amount });
    await transaction.save();

    try {
        const result = await chainflip.swap('ETH', 'BTC', amount);
        transaction.status = 'completed';
        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        transaction.status = 'failed';
        await transaction.save();
        res.status(500).json({ error: error.message });
    }
});

router.get('/transactions', async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
});

export default router;