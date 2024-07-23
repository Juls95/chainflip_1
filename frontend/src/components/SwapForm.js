// frontend/src/components/SwapForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const SwapForm = () => {
    const [ethAddress, setEthAddress] = useState('');
    const [btcAddress, setBtcAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [quote, setQuote] = useState(null);
    const [status, setStatus] = useState(null);
    const [wallet, setWallet] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setWallet(signer);
                const address = await signer.getAddress();
                setEthAddress(address);
            } catch (error) {
                console.error(error);
            }
        } else {
            alert('Please install MetaMask!');
        }
    };

    const handleGetQuote = async () => {
        const response = await axios.post('http://localhost:3001/quote', {
            srcAsset: 'USDC',
            srcChain: 'Ethereum',
            destAsset: 'BTC',
            destChain: 'Bitcoin',
            amount: ethers.utils.parseUnits(amount, 6).toString(), // USDC has 6 decimals
        });
        setQuote(response.data);
    };

    const handleRequestDepositAddress = async () => {
        const response = await axios.post('http://localhost:3001/swap', {
            srcAsset: 'USDC',
            srcChain: 'Ethereum',
            destAsset: 'BTC',
            destChain: 'Bitcoin',
            amount: ethers.utils.parseUnits(amount, 6).toString(),
            destAddress: btcAddress,
        });
        console.log(response.data);
    };

    const handleGetStatus = async (channelId) => {
        const response = await axios.get(`http://localhost:3001/status?channelId=${channelId}`);
        setStatus(response.data);
    };

    return (
        <div>
            <button onClick={connectWallet}>Connect Wallet</button>
            <input
                type="text"
                placeholder="BTC Address"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
            />
            <input
                type="number"
                placeholder="Amount in USDC"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleGetQuote}>Get Quote</button>
            {quote && <div>Quote: {JSON.stringify(quote)}</div>}
            <button onClick={handleRequestDepositAddress}>Request Deposit Address</button>
            <button onClick={() => handleGetStatus('channel-id-placeholder')}>Get Status</button>
            {status && <div>Status: {JSON.stringify(status)}</div>}
        </div>
    );
};

export default SwapForm;