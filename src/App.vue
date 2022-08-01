<script setup>
import AWaveLog from './components/AWaveLog.vue';
import AWaveLogo from './components/AWaveLogo.vue';
import AWaveIntro from './components/AWaveIntro.vue';
import AWaveInfo from './components/AWaveInfo.vue';
import AWaveRepo from './components/AWaveRepo.vue';
import { useStore } from './store';
const store = useStore();
store.initialize();
</script>

<template>
  <div class="waveportal w-full h-full">
    <AWaveLogo />
    <AWaveIntro />
    <AWaveLog />
    <div class="fixed bottom-[25px] md:bottom-[40px] left-[110px] md:left-[180px] mx-auto">
      <AWaveRepo />
    </div>
    <div class="fixed  bottom-[20px] md:bottom-[40px] right-[-80px] md:right-[10px] w-64 mx-auto">
      <AWaveInfo />
    </div>
  </div>
</template>

<style lang="scss">
</style>
