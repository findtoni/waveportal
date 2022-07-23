<script setup>
import { useStore } from '../store';
const store = useStore();

fetchWaves();
async function fetchWaves() {
  await store.fetchWaves();
}
</script>

<template>
  <div class="container">
    <h3 class="font-sans text-md md:text-xl font-bold text-white text-center pt-20 pb-4 md:pb-5">
      See who else waved at me
    </h3>
    <div class="flex justify-center items-center">
      <div class="w-full md:w-3/5 lg:w-1/2 flex flex-col space-y-3">
        <div v-for="({ waver, message, emoji, timestamp }, index) in store.waves" :key="index" class="flex justify-between items-center border rounded-md p-3 focus-within:md:p-5 border-[#2a2a2a]">
          <div class="w-auto">
            <span class="rounded-full bg-light py-2 px-3 text-xl">{{ emoji }}</span>
          </div>
          <div class="flex flex-col text-gray-300 w-full ml-4 md:ml-0 md:w-4/6">
            <p class="font-semibold text-sm md:text-lg">Message<span class="ml-2 font-medium text-white">{{ message }}</span></p>
            <p class="font-semibold text-sm md:text-lg inline-flex">Waver<span class="ml-2 font-medium text-white">{{ waver.substring(0, 20) + '...' }}</span></p>
            <p class="md:hidden font-semibold text-gray-300 text-sm">Waved on<span class="ml-2 font-medium text-white">{{ timestamp }}</span></p>
          </div>
          <p class="hidden md:inline-flex text-center font-semibold w-1/5 text-gray-300 text-md">{{ timestamp }}</p>
        </div>
      </div>
    </div>
  </div>
</template>