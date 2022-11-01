import { defineStore } from 'pinia';
import { ethers, providers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js';
import detectEthereumProvider from '@metamask/detect-provider'
import abi from '../abis/WavePortal.json';
import dateFormat from 'dateformat';

export const useStore = defineStore('waveportal', {
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
    }
  },
  getters: {
    ethereum() {
      return window.ethereum;
    },
    provider(state) {
      return new providers.Web3Provider(ethereum);
    },
    wavePortalContract(state) {
      const signer = this.provider.getSigner(state.account ? state.account : state.contract.address);
      return new ethers.Contract(state.contract.address, abi.abi, signer);
    },
    isConnected: state => state.account ? true : false,
    isWrongNetwork: state => state.network.chainId ? state.network.chainId !== '0x5' : true,
  },
  actions: {
    async initialize() {
      const chainId = await this.ethereum.request({ method: 'eth_chainId' });
      this.network.chainId = chainId;
      this.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    },
    async connectWallet(wallet) {
      if (wallet == 'metamask') {
        await this.useMetamask();
      } else await this.useWalletConnect();
      await this.fetchWaves();
    },
    async useMetamask() {
      const provider = await detectEthereumProvider();
      if (provider && provider == this.ethereum) {
        const accounts = await this.ethereum.request({ method: 'eth_requestAccounts' });
        const chainId = await this.ethereum.request({ method: 'eth_chainId' });
        const signer = this.provider.getSigner(accounts[0]);
        const signature = await signer.signMessage(accounts[0]);
        this.account = accounts[0];
        this.network.chainId = chainId;
        if (this.isWrongNetwork) await this.switchNetwork();
      } else console.log('Metamask is not installed');
    },
    async useWalletConnect() {
      const provider = new WalletConnectProvider({ infuraId: import.meta.env.VITE_INFURA_KEY });
      await provider.enable();
      const web3 = new providers.Web3Provider(provider);
      const accounts = await web3.eth.getAccounts();
      const chainId = await web3.eth.getChainId();
      this.account = accounts[0];
      this.network.chainId = chainId;
      if (this.isWrongNetwork) await this.switchNetwork();
    },
    async switchNetwork() {
      await this.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x5' }],
      });
      window.location.reload();
    },
    async fetchWaves() {
      const waves = await this.wavePortalContract.getAllWaves();
      this.waves = [];
      waves.forEach(wave => {
        this.waves.push({
          waver: wave.waver,
          message: wave.message,
          emoji: wave.emoji,
          timestamp: dateFormat(new Date(wave.timestamp * 1000), 'mmm dS, yyyy'),
          rawDate: new Date(wave.timestamp * 1000),
          transaction: wave[0]
        })
      });
      this.waves = this.waves.sort((a, b) => b.rawDate - a.rawDate);
    },
    async sendWave(wave) {
      const waveTransaction = await this.wavePortalContract.wave(wave.message, wave.emoji, { gasLimit: this.contract.gasLimit });
      await waveTransaction.wait();
      await this.fetchWaves();
      return waveTransaction.hash;
    },
  },
})