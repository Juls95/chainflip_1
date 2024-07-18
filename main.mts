import { SwapSDK } from "@chainflip/sdk/swap";
import { Wallet } from "ethers";
 
/*const options = {
  network: "perseverance", // Testnet
  backendServiceUrl: "https://example.chainflip.io",
  signer: Wallet.fromMnemonic(process.env.WALLET_MNEMONIC),
  broker: {
    url: 'https://my.broker.io',
    commissionBps: 0, // basis points, i.e. 100 = 1%
  },
};*/
const swapSDK = new SwapSDK({network: "perseverance"});

// Regresa info del LP al cual estamos solicitando
console.log(await swapSDK.getAssets())

/*const quoteArgs={
  srcAsset:'ETH',
  srcChain:'Ethereum',
  destAsset:'FLIP',
  destChain:'Ethereum',
  amount:(1e18).toString()
} as const;
const quote = await swapSDK.getQuote(quoteArgs);
console.log(quote);

const channel = await swapSDK.requestDepositAddress({
  ...quoteArgs,
  destAddress:'0x32CFeA4adcB3Dae5dDeBC5DCC4572b222D95D98e',
  //affiliateBrokers: //must define my own broker here.
})
console.log(channel);*/

// Depositchannel ID ayuda a verificar el status. expiran
//Asegurar que envia el asset en srcAsset.
const channelId='1818601-Ethereum-6'
const depositAddress ='0x32CFeA4adcB3Dae5dDeBC5DCC4572b222D95D98e'

//Regresa el estado del deposito.
const status = await swapSDK.getStatus({id:channelId});
console.log(status);//status boradcast requestes es que se solcito al validador enviar info.
// Ya envié desde mi metamask al a cuenta de depositAddress, ahora esperar a que camie de status
//https://scan.perseverance.chainflip.io/channels/1818601-Ethereum-6
//https://scan.perseverance.chainflip.io/swaps/1545
//