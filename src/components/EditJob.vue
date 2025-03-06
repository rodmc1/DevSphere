<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const route = useRoute();
const router = useRouter();
const toast = useToast();
const jobId = route.params.id; // Get the job ID from the route params
const jobsEndpoint = import.meta.env.VITE_JOB_API;
const jobData = reactive({
  title: '',
  type: '',
  description: '',
  salary: '',
  location: '',
  company: {
    name: '',
    description: '',
    contactPhone: '',
    contactEmail: ''
  }
});

const successMessage = ref('');
const errorMessage = ref('');

const updateJob = async () => {
  try {
    await axios.put(`${jobsEndpoint}/${jobId}`, jobData, {
      headers: { 'Content-Type': 'application/json' }
    });
    successMessage.value = 'Job updated successfully!';
    toast.success('Job Updated Successfully!');
    router.push(`/job/${jobId}`);
  } catch (error) {
    console.error('Error updating job:', error);
    errorMessage.value = 'Failed to update job.';
    toast.error('Job was not updated.');
  }
};

onMounted(async () => {
  try {
    const response = await axios.get(`${jobsEndpoint}/${jobId}`);
    Object.assign(jobData, response.data); // Populate form with existing job details
  } catch (error) {
    console.error('Error fetching job:', error);
    errorMessage.value = 'Failed to load job details.';
  }
});
</script>

<template>
  <section class="bg-[#F5F7FA]">
    <div class="container m-auto max-w-2xl py-24">
      <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
        <h2 class="text-3xl text-center font-semibold mb-6">Edit Job</h2>
        <form @submit.prevent="updateJob">
          <div v-if="errorMessage" class="text-red-500">{{ errorMessage }}</div>
          <div v-if="successMessage" class="text-green-500">{{ successMessage }}</div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Job Type</label>
            <select v-model="jobData.type" id="type" class="border rounded w-full py-2 px-3" required>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Remote">Remote</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2">Job Listing Name</label>
            <input
              type="text"
              id="title"
              v-model="jobData.title"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="eg. Beautiful Apartment In Miami"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700 font-bold mb-2">Description</label>
            <textarea
              id="description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="Add any job duties, expectations, requirements, etc"
              v-model="jobData.description"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="type" class="block text-gray-700 font-bold mb-2">Salary</label>
            <select id="salary" v-model="jobData.salary" class="border rounded w-full py-2 px-3" required>
              <option value="Under $50K">under $50K</option>
              <option value="$50K - $60K">$50 - $60K</option>
              <option value="$60K - $70K">$60 - $70K</option>
              <option value="$70K - $80K">$70 - $80K</option>
              <option value="$80K - $90K">$80 - $90K</option>
              <option value="$90K - $100K">$90 - $100K</option>
              <option value="$100K - $125K">$100 - $125K</option>
              <option value="$125K - $150K">$125 - $150K</option>
              <option value="$150K - $175K">$150 - $175K</option>
              <option value="$175K - $200K">$175 - $200K</option>
              <option value="Over $200K">Over $200K</option>
            </select>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 font-bold mb-2"> Location </label>
            <input
              type="text"
              id="location"
              v-model="jobData.location"
              class="border rounded w-full py-2 px-3 mb-2"
              placeholder="Company Location"
              required
            />
          </div>

          <h3 class="text-2xl mb-5">Company Info</h3>

          <div class="mb-4">
            <label for="company" class="block text-gray-700 font-bold mb-2">Company Name</label>
            <input
              type="text"
              id="company"
              v-model="jobData.company.name"
              class="border rounded w-full py-2 px-3"
              placeholder="Company Name"
            />
          </div>

          <div class="mb-4">
            <label for="company_description" class="block text-gray-700 font-bold mb-2">Company Description</label>
            <textarea
              v-model="jobData.company.description"
              id="company_description"
              class="border rounded w-full py-2 px-3"
              rows="4"
              placeholder="What does your company do?"
            ></textarea>
          </div>

          <div class="mb-4">
            <label for="contact_email" class="block text-gray-700 font-bold mb-2">Contact Email</label>
            <input
              type="email"
              id="contact_email"
              v-model="jobData.company.contactEmail"
              class="border rounded w-full py-2 px-3"
              placeholder="Email address for applicants"
              required
            />
          </div>
          <div class="mb-4">
            <label for="contact_phone" class="block text-gray-700 font-bold mb-2">Contact Phone</label>
            <input
              type="tel"
              id="contact_phone"
              v-model="jobData.company.contactPhone"
              class="border rounded w-full py-2 px-3"
              placeholder="Optional phone for applicants"
            />
          </div>

          <div>
            <button
              class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
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
      <h2 class="text-xl font-bold mb-2 text-green-600">Job Created Successfully!</h2>

      <button @click="navigateToJobs" class="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg w-full">
        Go to Jobs
      </button>
    </div>
  </div>
</template>
