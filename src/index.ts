import express from 'express';
import bodyParser from 'body-parser';
import { SwapSDK, ChainflipNetwork } from '@chainflip/sdk/swap';
import { Wallet } from 'ethers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3001;

app.use(bodyParser.json());

const mnemonic = process.env.WALLET_MNEMONIC;
if (!mnemonic) {
    throw new Error('WALLET_MNEMONIC environment variable not set');
}

// Create a Wallet object from the mnemonic
const wallet = Wallet.fromPhrase(mnemonic);
const privateKey = wallet.privateKey;
const publicKey = wallet.publicKey;

const options = {
    network: 'perseverance' as ChainflipNetwork, // Use type assertion for network
    backendServiceUrl: "https://example.chainflip.io",
    signer: wallet,
    broker: {
      url: 'https://my.broker.io',
      commissionBps: 0, // basis points, i.e. 100 = 1%
    },
};

const swapSDK = new SwapSDK(options);

app.get('/assets', async (req, res) => {
    try {
        const assets = await swapSDK.getAssets();
        res.status(200).json(assets);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

app.post('/quote', async (req, res) => {
    const { srcAsset, srcChain, destAsset, destChain, amount } = req.body;
    try {
        const quote = await swapSDK.getQuote({ srcAsset, srcChain, destAsset, destChain, amount });
        res.status(200).json(quote);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
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
            affiliateBrokers: [
                {
                    account: 'https://my.broker.io',
                    commissionBps: 0 // basis points, i.e. 100 = 1%
                }
            ],
        });
        res.status(200).json(channel);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

app.get('/status', async (req, res) => {
    const { channelId } = req.query;
    try {
        const status = await swapSDK.getStatus({ id: channelId as string });
        res.status(200).json(status);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
});

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Welcome to Chainflip Swap API');
});

app.listen(port, () => {
    console.log(`Server running on port  ${port}`);
});