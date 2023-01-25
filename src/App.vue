<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from './store';
import ALogo from './components/ALogo.vue';
import ALoading from './components/base/ALoading.vue';
import AWaveIntro from './components/AWaveIntro.vue';
import AWaveLog from './components/AWaveLog.vue';
import AFooter from './components/AFooter.vue';

const isLoading = ref(true);
const store = useStore();
store.initialize();
onMounted(() => isLoading.value = false);
</script>

<template>
  <div class="waveportal w-full h-full">
    <div v-if="isLoading" class="flex justify-center items-center h-full">
      <ALoading is-large />
    </div>
    <div v-else>
      <ALogo />
      <AWaveIntro />
      <AWaveLog />
      <AFooter />
    </div>
  </div>
</template>

<style lang="scss">
</style>
