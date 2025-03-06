<script setup>
import Card from '@/components/Card.vue';
import { RouterLink } from 'vue-router';
</script>

<template>
  <section class="py-4 bg-slate-200">
    <div class="container-xl lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
        <Card bg="bg-blue-100" brdr="border border-blue-100" txt="text-blue-900">
          <h2 class="text-2xl font-bold">For Developers</h2>
          <p class="mt-2 mb-4">Browse our Developer jobs and start your career today.</p>
          <RouterLink to="jobs" class="inline-block bg-blue-900 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
            Browse Jobs
          </RouterLink>
        </Card>
        <Card bg="bg-blue-100" brdr="border border-blue-100" txt="text-blue-900">
          <h2 class="text-2xl font-bold">For Employers</h2>
          <p class="mt-2 mb-4">List your job to find the perfect developer for the role.</p>
          <RouterLink to="/job/add" class="inline-block bg-blue-900 text-white rounded-lg px-4 py-2 hover:bg-blue-600">
            Add Job
          </RouterLink>
        </Card>
      </div>
    </div>
  </section>
</template>
