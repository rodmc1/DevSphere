<script setup>
import { defineProps, onMounted, ref, computed } from 'vue';
import axios from 'axios';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import { RouterLink, useRouter } from 'vue-router';

const { id } = defineProps({
  id: {
    type: [String, Number]
  } // 'id' is now automatically passed by Vue Router
});

const showSuccessModal = ref(false); // Controls the modal visibility
const router = useRouter();
const job = ref({});
const isLoading = ref(true);
const error = ref(null);
const company = computed(() => job.value.company || { name: 'N/A', description: 'No description available' });
const jobsEndpoint = import.meta.env.VITE_JOB_API;

const handleDeleteJob = async () => {
  await axios.delete(`${jobsEndpoint}/${id}`);
  showSuccessModal.value = true;
};

const navigateToJobs = () => {
  router.push('/jobs');
};

onMounted(async () => {
  try {
    const response = await axios.get(`${jobsEndpoint}/${id}`);
    if (response) {
      job.value = response.data;
    }
    isLoading.value = false;
  } catch (err) {
    console.error('Failed to load job:', err);
    if (err.response?.status === 404) {
      router.push('/not-found'); // Redirect to Not Found page
    } else {
      error.value = 'Failed to load job details. Please try again later.';
    }
  }
});
</script>
<template>
  <section>
    <div class="container m-auto py-6 px-6">
      <RouterLink to="/jobs" class="text-blue-500 hover:text-green-600 flex items-center">
        <i class="pi pi-arrow-circle-left mr-2"></i> Back to Job Listings
      </RouterLink>
    </div>
  </section>

  <section class="bg-[#F5F7FA]">
    <div class="container m-auto py-10 px-6">
      <!-- Loading spinner -->
      <div v-if="isLoading" class="text-center">
        <PulseLoader />
      </div>

      <!-- Show Job after loading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
        <main>
          <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
            <div class="text-gray-500 mb-4">Full-Time</div>
            <h1 class="text-3xl font-bold mb-4">{{ job.title }}</h1>
            <div class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
              <i class="pi pi-map-marker text-xl text-orange-700 mr-2"></i>
              <p class="text-orange-700">{{ job.location }}</p>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-green-800 text-lg font-bold mb-6">Job Description</h3>

            <p class="mb-4">
              {{ job.description }}
            </p>

            <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

            <p class="mb-4">{{ job.salary }}</p>
          </div>
        </main>

        <!-- Sidebar -->
        <aside>
          <!-- Company Info -->
          <div class="bg-white p-6 rounded-lg shadow-md">
            <h3 class="text-xl font-bold mb-6">Company Info</h3>
            <h2 class="text-2xl">{{ company.name }}</h2>
            <p class="my-2">
              {{ company.description }}
            </p>
            <hr class="my-4" />
            <h3 class="text-xl">Contact Email:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ company.contactEmail }}</p>
            <h3 class="text-xl">Contact Phone:</h3>
            <p class="my-2 bg-green-100 p-2 font-bold">{{ company.contactPhone }}</p>
          </div>

          <!-- Manage -->
          <div class="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 class="text-xl font-bold mb-6">Manage Job</h3>
            <RouterLink
              :to="`${job.id}/edit`"
              class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
              >Edit Job</RouterLink
            >
            <button
              @click="handleDeleteJob"
              class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
            >
              Delete Job
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <!-- Success Modal with Transition -->
  <div
    v-if="showSuccessModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300"
  >
    <div
      class="bg-white p-6 rounded-lg shadow-lg text-center w-80 transform transition-all duration-700 scale-95 opacity-0"
      :class="{ 'scale-100 opacity-100': showSuccessModal }"
    >
      <h2 class="text-xl font-bold mb-2 text-green-600">Job Deleted Successfully!</h2>
      <p class="text-gray-700 mb-4">The job {{ job.title }}has been removed.</p>

      <button @click="navigateToJobs" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full">
        Go to Jobs
      </button>
    </div>
  </div>
</template>
