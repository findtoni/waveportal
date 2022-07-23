# waveportal — web3 dapp
[![Netlify Status](https://api.netlify.com/api/v1/badges/fee1636f-0aa9-4724-8b7e-c9bf943ecbd9/deploy-status)](https://app.netlify.com/sites/waveportal-dapp/deploys)

Use this dApp to wave at me on Ethereum!

#### Stack
- Solidity
- Hardhat
- Ethers.js
- Vue 3, Vite
- Pinia
- Metamask
- WalletConnect

##### Smart Contract on Goerli
- [Waveportal](https://goerli.etherscan.io/tx/0xF7B7ab1dE3fba402e563E3F9b17547a0AADdB078)

##### Instructions
1. Run `npm install` to install dependencies
2. Run `npx hardhat node` to start Hardhat node
3. Run scripts with `npx hardhat run scripts/run.js --network localhost`
4. Deploy with `npx hardhat run scripts/deploy.js --network localhost`
5. Run `npm run dev` to start server
