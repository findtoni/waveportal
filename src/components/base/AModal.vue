<script setup>
import { ref } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
import { XIcon } from '@heroicons/vue/outline';

const props = defineProps({
  title: {
    type: String,
    required: false
  },
  open :{
    type: Boolean,
    required: false
  },
  hide: {
    type: Boolean,
    required: false,
    default: false
  }
});
const emits = defineEmits(['close']);
</script>

<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-10 overflow-visible" @close="$emit('close')">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center w-full min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel class="relative bg-[#222124] rounded-lg px-4 py-4 md:py-8 text-left overflow-visible shadow-xl transform transition-all w-full md:w-1/4">
              <div>
                <div v-if="!hide" class="flex justify-between items-center">
                  <DialogTitle as="h3" class="text-lg leading-6 font-medium text-white">{{ props.title }}</DialogTitle>
                  <XIcon @click="$emit('close')" class="w-5 h-5 text-gray-300 hover:text-white cursor-pointer"/>
                </div>
                <slot />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
