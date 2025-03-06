<template>
  <footer class="bg-gray-800 text-white py-4">
    <div class="container mx-auto text-center">
      <p class="text-sm">© rycnn {{ new Date().getFullYear() }} Coders hunting ground. All rights reserved.</p>
      <nav class="mt-2">
        <RouterLink to="" @click.prevent class="text-gray-400 hover:text-white mx-2">Terms of Service</RouterLink> |
        <RouterLink to="" @click.prevent class="text-gray-400 hover:text-white mx-2">Privacy Policy</RouterLink>
      </nav>
    </div>
  </footer>
</template>
