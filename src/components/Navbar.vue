<script setup>
import { RouterLink, useRoute } from 'vue-router';
import logo from '@/assets/img/logo.png';

const route = useRoute();
const isActive = path => {
  return route.path === path ? 'bg-blue-900 text-white' : 'text-white hover:bg-blue-800';
};
</script>
<template>
  <nav class="bg-[#1E1E2E] border-b border-[#F5F7FA]">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
          <!-- Logo -->
          <RouterLink to="/" class="flex flex-shrink-0 items-center mr-4">
            <img class="h-10 w-auto bg-white rounded-2xl" :src="logo" alt="Vue Jobs" />
            <span class="hidden md:block text-white text-2xl font-bold ml-2">DevSphere</span>
          </RouterLink>
          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink to="/" :class="isActive('/')" class="rounded-md px-3 py-2"> Home </RouterLink>
              <RouterLink to="/jobs" :class="isActive('/jobs')" class="rounded-md px-3 py-2"> Jobs </RouterLink>
              <RouterLink to="/job/add" :class="isActive('/job/add')" class="rounded-md px-3 py-2"> Create </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
