<script setup>
import { ref } from 'vue';
import { useStore } from '../store';
import AModal from './base/AModal.vue';
import ALoading from './base/ALoading.vue';

const store = useStore();
const open = ref(false);
const loading = ref({
  metamask: false,
  walletconnect: false
});

async function connectWallet(network) {
  loading.value[network] = true;
  await store.connectWallet(network);
  loading.value[network] = false;
  open.value = false;
}
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2">
      <button v-if="!store.isConnected" @click="open = true;" class="wave-button bg-white rounded font-semibold h-10 transition ease-in-out delay-150 hover:scale-105">
        <img src="wallet.svg" width="20" height="auto" alt="wallet" class="inline-flex mr-1 pb-1">
        Connect Wallet
      </button>
      <span v-if="store.isConnected && store.isWrongNetwork" class="w-auto inline-flex mx-auto items-center text-center px-2 py-0.5 rounded text-xs font-medium text-gray-300">
        <svg class="mr-1.5 h-2 w-2 text-purple-300" fill="currentColor" viewBox="0 0 8 8">
          <circle cx="4" cy="4" r="3" />
        </svg>
        Switch network to ropsten
      </span>
    </div>
    <AModal title="Connect a wallet" :open="open" @close="open = false">
      <div class="flex flex-col space-y-3 pt-5">
        <div @click="connectWallet('metamask')" class="flex justify-between items-center rounded bg-light border border-[#40444f] hover:border-gray-500 cursor-pointer p-3">
          <span class="text-white">Metamask
            <ALoading v-if="loading.metamask" />
          </span>
          <img src="metamask.png" alt="MetaMask Logo" height="auto" width="25">
        </div>
        <div @click="connectWallet('walletconnect')" class="flex justify-between items-center rounded bg-light border border-[#40444f] hover:border-gray-500 cursor-pointer p-3">
          <span class="text-white">WalletConnect
            <ALoading v-if="loading.walletconnect" />
          </span>
          <img src="walletconnect.svg" alt="WalletConnect Logo" height="auto" width="25">
        </div>
      </div>
    </AModal>
  </div>
</template>