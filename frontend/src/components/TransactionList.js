// frontend/src/components/TransactionList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const response = await axios.get('/api/transactions');
            setTransactions(response.data);
        };
        fetchTransactions();
    }, []);

    return (
        <ul>
            {transactions.map((transaction) => (
                <li key={transaction._id}>
                    {transaction.ethAddress} -> {transaction.btcAddress} : {transaction.amount} (Status: {transaction.status})
                </li>
            ))}
        </ul>
    );
};

export default TransactionList;