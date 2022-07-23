<script setup>
import { ref } from 'vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid';
const open = ref(false);
</script>

<template>
  <div class="w-auto">
    <div v-if="open" class="rounded text-white p-4 mr-10 mb-4 border-light bg-light border">
      <p class="leading-snug text-sm">
        <a href="https://findtoni.dev/blog/ethereum-dev-overview" target="_blank" class="underline">Here's</a>
        a quick overview of building on Ethereum</p>
      <p class="leading-snug text-sm pt-1">
        <a href="https://buildspace.so/p/build-solidity-web3-app" target="_blank" class="underline">Buildspace</a>
        created this tutorial and <a href="https://buildspace.so/projects" target="_blank" class="underline">many more</a> awesome web3 dApp tutorials</p>
    </div>
    <QuestionMarkCircleIcon @click="open = !open" class="h-10 w-10 text-gray-300 hover:text-white cursor-pointer" />
  </div>
</template>