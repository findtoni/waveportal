<script setup>
import { ref, computed } from 'vue';
import { useStore } from '../store';
import { CheckIcon, SelectorIcon, CheckCircleIcon, ExternalLinkIcon } from '@heroicons/vue/solid';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxLabel, ComboboxOption, ComboboxOptions } from '@headlessui/vue';
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue';
import AModal from './base/AModal.vue';
import ALoading from './base/ALoading.vue';

const store = useStore();
const messages = [
  { id: 1, content: `Hello` },
  { id: 2, content: `Hi!` },
  { id: 3, content: `Heyyy` },
  { id: 4, content: `This is cool` },
  { id: 5, content: `Nice work!` },
  { id: 6, content: `Not bad` },
];
const emojis = [
  { id: 1, content: '👋' },
  { id: 2, content: '😊' },
  { id: 3, content: '✨' },
  { id: 4, content: '🤟' },
  { id: 5, content: '🦾' },
  { id: 6, content: '🎉' },
  { id: 7, content: '🛸' },
  { id: 8, content: '🚀' },
  { id: 9, content: '🔥'  }
];

const open = ref(false);
const loading = ref(false);
const hash = ref(null);
const wave = ref({ message: 'Hello!', emoji: '👋' });
const query = ref('');
const filtered = computed(() =>
  query.value === ''
    ? messages
    : messages.filter(({ content }) => {
        return content.toLowerCase().includes(query.value.toLowerCase())
      })
);

async function sendWave() {
  loading.value = true;
  hash.value = await store.sendWave(wave.value);
  loading.value = false;
}
</script>

<template>
  <div class="w-full">
    <button v-if="store.isWrongNetwork" class="w-full wave-button cursor-not-allowed bg-gray-300 rounded font-semibold h-10 mb-2">Wave at me!</button>
    <button v-else @click="open = true" class="w-full wave-button bg-white rounded font-semibold h-10 mb-2 transition ease-in-out delay-150 hover:scale-105">Wave at me!</button>
    <AModal title="Wave at me" :open="open" @close="open = false" :hide="loading || hash">
      <div v-if="!loading && !hash" class="w-full flex flex-col space-y-4 pt-4">
        <Listbox as="div" v-model="wave.emoji">
          <ListboxLabel class="block text-sm font-medium text-white">Choose message</ListboxLabel>
            <div class="mt-1 relative">
              <ListboxButton class="bg-white relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="block truncate">{{ wave.emoji }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon class="h-5 w-5 text-gray-400" ari idden="true" />
                </span>
              </ListboxButton>
              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  <ListboxOption as="template" v-for="emoji in emojis" :key="emoji.id" :value="emoji.content" v-slot="{ active, selected }">
                    <li @click="$emit('update:value', emoji.content)" :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ emoji.content }}
                      </span>
                      <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
        </Listbox>
        <Listbox as="div" v-model="wave.message">
          <ListboxLabel class="block text-sm font-medium text-white">Choose message</ListboxLabel>
            <div class="mt-1 relative">
              <ListboxButton class="bg-white relative w-full border border-gray-300 rounded shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <span class="block truncate">{{ wave.message }}</span>
                <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <SelectorIcon class="h-5 w-5 text-gray-400" ari idden="true" />
                </span>
              </ListboxButton>
              <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                <ListboxOptions class="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  <ListboxOption as="template" v-for="message in messages" :key="message.id" :value="message.content" v-slot="{ active, selected }">
                    <li @click="$emit('update:value', message.content)" :class="[active ? 'text-white bg-indigo-600' : 'text-gray-900', 'cursor-default select-none relative py-2 pl-3 pr-9']">
                      <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">
                        {{ message.content }}
                      </span>
                      <span v-if="selected" :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
        </Listbox>
        <button @click="sendWave" class="w-full h-10 bg-white rounded font-semibold">Wave at me!</button>
      </div>
      <div v-else-if="loading || hash" class="flex flex-col items-center space-y-3 py-4">
        <div v-if="!hash" class="flex flex-col items-center space-y-3">
          <ALoading is-large />
          <p class="text-white text-lg">Mining transaction...</p>
        </div>
        <div v-else class="flex flex-col items-center space-y-3">
          <CheckCircleIcon class="h-12 w-12 text-green-600" />
          <p class="text-white text-lg">Transaction successful!</p>
          <a :href="`https://goerli.etherscan.io/tx/${hash}`" target="_blank">
            <p class="text-white underline inline-flex">View Transaction<ExternalLinkIcon class="w-4 h-4 mr-2 mt-1" /></p>
          </a>
        </div>
      </div>
    </AModal>
  </div>
</template>