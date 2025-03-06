<script setup>
import { ref, defineProps, onMounted } from 'vue';
import JobList from './JobList.vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

defineProps({
  limit: Number,
  showViewJobs: {
    default: false,
    type: Boolean
  }
});

const jobs = ref([]);
const isJobLoading = ref(true);
const jobsEndpoint = import.meta.env.VITE_JOB_API;
console.log(jobsEndpoint);
onMounted(async () => {
  try {
    const jobResponse = await axios.get(jobsEndpoint);
    jobs.value = jobResponse.data; // Ensure Vue knows it's reactive

    if (jobResponse.data) {
      isJobLoading.value = false;
    }
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
});
</script>

<template>
  <section class="bg-[#F5F7FA] px-4 py-10">
    <div class="container-xl lg:container m-auto">
      <h2 class="text-3xl font-bold text-gray-700 mb-6 text-center">Browse Jobs</h2>
      <!-- Loading spinner -->
      <div v-if="isJobLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>

      <!-- Show Job Listing after loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobList v-for="job in jobs.slice(0, limit || jobs.length)" :key="job.id" :job="job" />
      </div>
    </div>
  </section>

  <section v-if="showViewJobs" class="m-auto max-w-lg my-10 px-6">
    <RouterLink to="jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
      >View All Jobs</RouterLink
    >
  </section>
</template>
