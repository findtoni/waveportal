<script setup>
import AWaveLog from './components/AWaveLog.vue';
import AWaveLogo from './components/AWaveLogo.vue';
import AWaveIntro from './components/AWaveIntro.vue';
import AWaveInfo from './components/AWaveInfo.vue';
import AWaveRepo from './components/AWaveRepo.vue';
</script>

<template>
  <div class="waveportal w-full h-full">
    <AWaveLogo />
    <AWaveIntro />
    <AWaveLog />
    <div class="w-5/6 md:w-3/4 mx-auto py-10">
      <div class="flex justify-between items-center mx-auto left-0 right-0 bottom-4 absolute w-11/12 md:w-8/12">
        <AWaveRepo />
        <AWaveInfo />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
</style>
