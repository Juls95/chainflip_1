// generate-mnemonic.js
const { Wallet } = require('ethers');

const wallet = Wallet.createRandom();
console.log('Mnemonic:', wallet.mnemonic.phrase);