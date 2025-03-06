<script setup>
import { defineProps } from 'vue';

defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100'
  },
  txt: {
    type: String,
    default: 'text-gray-500'
  },
  brdr: {
    type: String
  }
});
</script>

<template>
  <div :class="`${bg} ${txt} ${brdr} p-6 rounded-lg shadow-md`">
    <slot></slot>
  </div>
</template>
