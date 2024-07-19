// backend/src/models/Transaction.ts
import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    ethAddress: String,
    btcAddress: String,
    amount: Number,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
});

export const Transaction = model('Transaction', transactionSchema);