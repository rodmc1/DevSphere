<script setup>
import Navbar from '@/components/Navbar.vue';
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <main class="flex-1">
      <Navbar />
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
