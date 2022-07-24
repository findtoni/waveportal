import { defineStore } from 'pinia';
import { ethers, providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';
import detectEthereumProvider from '@metamask/detect-provider'
import abi from '../abis/WavePortal.json';
import dateFormat from 'dateformat';

export const useStore = defineStore('liquid', {
  state: () => {
    return {
      account: null,
      waves: [],
      contract: {
        address: import.meta.env.VITE_CONTRACT_ADDRESS,
        gasLimit: 300000
      },
      network: {
        chainId: null,
      },
      loading: false,
      error: null,
    }
  },
  getters: {
    ethereum() {
      return window.ethereum;
    },
    wavePortalContract(state) {
      const provider = new providers.Web3Provider(ethereum);
      const signer = provider.getSigner(import.meta.env.VITE_CONTRACT_ADDRESS);
      return new ethers.Contract(state.contract.address, abi.abi, signer);
    },
    isConnected: state => state.account ? true : false,
    isWrongNetwork: state => state.network.chainId ? state.network.chainId !== '0x5' : true,
  },
  actions: {
    async connectWallet(network) {
      if (network == 'metamask') {
        await this.useMetamask();
      } else await this.useWalletConnect();
      await this.fetchWaves();
    },
    async useMetamask() {
      const provider = await detectEthereumProvider();
      if (provider && provider == this.ethereum) {
        const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await this.ethereum.request({ method: 'eth_chainId' });
        this.account = accounts[0];
        this.network.chainId = chainId;
      } else this.error = 'Install Metamask';
    },
    async useWalletConnect() {
      const provider = new WalletConnectProvider({ infuraId: import.meta.env.VITE_INFURA_KEY });
      await provider.enable();
      const web3 = new providers.Web3Provider(provider);
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      this.account = accounts[0];
      this.network.chainId = chainId;
    },
    async fetchWaves() {
      const waves = await this.wavePortalContract.getAllWaves();
      this.waves = [];
      waves.forEach(wave => {
        this.waves.push({
          waver: wave.waver,
          message: wave.message,
          emoji: wave.emoji,
          timestamp: dateFormat(new Date(wave.timestamp * 1000), 'mmmm dS, yyyy'),
          transaction: wave[0]
        })
      });
    },
    async sendWave(wave) {
      const waveTransaction = await this.wavePortalContract.wave(wave.message, wave.emoji, { gasLimit: this.contract.gasLimit });
      await waveTransaction.wait();
      await this.fetchWaves();
      return waveTransaction.hash;
    },
  },
})