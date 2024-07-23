import express from 'express';
import bodyParser from 'body-parser';
import { SwapSDK } from '@chainflip/sdk/swap';
import { HDNodeWallet } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

const mnemonic = process.env.WALLET_MNEMONIC;
if (!mnemonic) {
    throw new Error('WALLET_MNEMONIC environment variable not set');
}
const signer = HDNodeWallet.fromMnemonic(mnemonic);

const swapSDK = new SwapSDK({
    network: "perseverance",
    backendServiceUrl: "https://example.chainflip.io",
    signer,
    broker: {
        url: 'https://my.broker.io',
        commissionBps: 100, // 100 basis points = 1%
    },
});

app.get('/assets', async (req, res) => {
    try {
        const assets = await swapSDK.getAssets();
        res.status(200).json(assets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/quote', async (req, res) => {
    const { srcAsset, srcChain, destAsset, destChain, amount } = req.body;
    try {
        const quote = await swapSDK.getQuote({ srcAsset, srcChain, destAsset, destChain, amount });
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/swap', async (req, res) => {
    const { srcAsset, srcChain, destAsset, destChain, amount, destAddress } = req.body;
    try {
        const channel = await swapSDK.requestDepositAddress({
            srcAsset,
            srcChain,
            destAsset,
            destChain,
            amount,
            destAddress,
            affiliateBrokers: ['https://my.broker.io'],
        });
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/status', async (req, res) => {
    const { channelId } = req.query;
    try {
        const status = await swapSDK.getStatus({ id: channelId as string });
        res.status(200).json(status);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});