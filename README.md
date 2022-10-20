# waveportal
[![Netlify Status](https://api.netlify.com/api/v1/badges/fee1636f-0aa9-4724-8b7e-c9bf943ecbd9/deploy-status)](https://app.netlify.com/sites/waveportal-dapp/deploys)

[![waveportal](https://wgxwocyublngaeisjxte.supabase.co/storage/v1/object/public/assets/projects/waveportal-cover.jpg)](https://wgxwocyublngaeisjxte.supabase.co/storage/v1/object/public/assets/projects/waveportal-cover.jpg)


## Stack
- Solidity
- Hardhat
- Ethers.js
- Vue 3, Vite
- Pinia
- Metamask
- WalletConnect

## Smart Contract on Goerli
- [Waveportal](https://goerli.etherscan.io/address/0xf7b7ab1de3fba402e563e3f9b17547a0aaddb078)

## Instructions

``` bash
# install dependencies
$ npm install

# start hardhat node
$ npx hardhat node

# run scripts
$ npx hardhat run scripts/run.js --network localhost

# deploy smart contract
$ npx hardhat run scripts/deploy.js --network localhost

# start server
$ npm run dev
```
