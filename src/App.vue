<script setup>
import ALogo from './components/ALogo.vue';
import AWaveIntro from './components/AWaveIntro.vue';
import AWaveLog from './components/AWaveLog.vue';
import AFooter from './components/AFooter.vue';
import { useStore } from './store';
const store = useStore();
store.initialize();
</script>

<template>
  <div class="waveportal w-full h-full">
    <ALogo />
    <AWaveIntro />
    <AWaveLog />
    <AFooter />
  </div>
</template>

<style lang="scss">
</style>
