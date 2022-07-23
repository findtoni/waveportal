<script setup>
import { useStore } from '../store';
const store = useStore();
</script>

<template>
  <div>
    <div class="flex justify-center items-center pt-5 md:pt-10">
      <img src="/logo.svg" width="135" height="auto" alt="Logo">
    </div>
    <span v-if="store.isConnected" class="hidden absolute w-auto top-[70px] left-[450px] md:left-[1020px] md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
      <svg class="mr-1.5 h-2 w-2 text-purple-400" fill="currentColor" viewBox="0 0 8 8">
        <circle cx="4" cy="4" r="3" />
      </svg>
      <span class="truncate w-32">{{ store.account }}</span>
    </span>
  </div>
</template>
