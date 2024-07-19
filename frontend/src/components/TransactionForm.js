// frontend/src/components/TransactionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const TransactionForm = () => {
    const [ethAddress, setEthAddress] = useState('');
    const [btcAddress, setBtcAddress] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/transaction', { ethAddress, btcAddress, amount });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="ETH Address" value={ethAddress} onChange={(e) => setEthAddress(e.target.value)} />
            <input type="text" placeholder="BTC Address" value={btcAddress} onChange={(e) => setBtcAddress(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default TransactionForm;