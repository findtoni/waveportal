<script setup>
import { ref } from 'vue';
import { QuestionMarkCircleIcon } from '@heroicons/vue/solid';
const open = ref(false);
</script>

<template>
  <div class="fixed bottom-[25px] md:bottom-[40px] left-[110px] md:left-[180px] mx-auto">
    <div class="w-auto">
      <a href="https://github.com/findtoni/waveportal" target="_blank">
        <img class="w-20 md:w-22" width="auto" height="auto" alt="GitHub stars" src="https://img.shields.io/github/stars/findtoni/waveportal?style=social">
      </a>
    </div>
  </div>
  <div class="fixed  bottom-[20px] md:bottom-[40px] right-[-80px] md:right-[10px] w-64 mx-auto">
    <div class="w-auto">
      <div v-if="open" class="rounded text-white p-4 mr-10 mb-4 border-light bg-light border">
        <p class="leading-snug text-sm">
          <a href="https://findtoni.dev/blog/ethereum-dev-overview" target="_blank" class="underline">Here's</a>
          a quick overview of building on Ethereum</p>
        <p class="leading-snug text-sm pt-1">
          <a href="https://findtoni.dev/blog/build-solidity-vue-web3-app" target="_blank" class="underline">
          Learn how to build this dApp</a>
        </p>
      </div>
      <QuestionMarkCircleIcon @click="open = !open" class="h-8 w-8 md:h-10 md:w-10 text-gray-300 hover:text-white cursor-pointer" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>