<script setup>
import { useStore } from '../store';
import AConnectWallet from './AConnectWallet.vue';
import ASendWave from './ASendWave.vue';

const store = useStore();
</script>

<template>
  <div class="w-9/12 md:w-3/5 mx-auto">
    <div class="flex flex-col items-center justify-between">
      <h1 class="font-serif text-white font-semibold text-3xl md:text-5xl pt-8 md:pt-10">
        Hey there! <span class="text-2xl md:text-4xl">👋</span>
      </h1>
      <h3 class="font-sans text-gray-300 text-center font-semibold text-md md:text-xl pt-4">
        I’m Toni, a curious and creative SWE <br class="hidden md:inline-flex" />learning how to build on web3.
      </h3>
      <p class="text-gray-300 text-center font-medium text-sm md:text-lg pt-2">Use this dApp to wave at me on Ethereum</p>
    </div>
    <div class="w-2/3 md:w-2/5 lg:w-1/4 mx-auto">
      <AConnectWallet v-if="!store.isConnected"/>
      <ASendWave v-else />
    </div>
  </div>
</template>
