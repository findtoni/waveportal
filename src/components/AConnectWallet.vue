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

async function connectWallet(wallet) {
  loading.value[wallet] = true;
  await store.connectWallet(wallet);
  loading.value[wallet] = false;
  open.value = false;
}
</script>

<template>
  <div>
    <div class="flex flex-col space-y-2">
      <button v-if="!store.isConnected" @click="open = true;" class="wave-button bg-white rounded font-semibold h-10 transition ease-in-out delay-150 hover:scale-105">
        <img src="/wallet.svg" width="20" height="auto" alt="wallet" class="inline-flex mr-1 pb-1">
        Connect Wallet
      </button>
    </div>
    <AModal title="Connect a wallet" :open="open" @close="open = false">
      <div class="flex flex-col space-y-3 pt-5">
        <div @click="connectWallet('metamask')" class="flex justify-between items-center rounded bg-light border border-[#40444f] hover:border-gray-500 cursor-pointer p-3">
          <span class="text-white">Metamask
            <ALoading v-if="loading.metamask" />
          </span>
          <img src="/metamask.png" alt="MetaMask Logo" height="auto" width="25">
        </div>
        <div @click="connectWallet('walletconnect')" class="flex justify-between items-center rounded bg-light border border-[#40444f] hover:border-gray-500 cursor-pointer p-3">
          <span class="text-white">WalletConnect
            <ALoading v-if="loading.walletconnect" />
          </span>
          <img src="/walletconnect.svg" alt="WalletConnect Logo" height="auto" width="25">
        </div>
      </div>
    </AModal>
  </div>
</template>