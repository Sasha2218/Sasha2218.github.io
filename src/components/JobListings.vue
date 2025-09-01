<script setup>
import { RouterLink } from 'vue-router';
import JobListing from './JobListing.vue';
import {reactive, onMounted, ref} from 'vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import axios from 'axios';

const props = defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
});


const state = reactive({
    jobs: [],
    isLoading: true
});
const showAll = ref(false);

onMounted(async () => {
    try {
        const response = await axios.get('/api/jobs');
        state.jobs = response.data;
    } catch (error) {
        console.error('Error fetching jobs:', error);
    } finally {
        state.isLoading = false;
    }
});
</script>
<template>

<div class="bg-primary min-h-screen py-10">
  <section class="container-xl lg:container m-auto">
    <div class="bg-white rounded-xl shadow-md px-6 py-10">
      <h2 class="text-3xl font-bold text-secondary underline mb-6 text-center">
        Browse Jobs
      </h2>
      <!-- Show a loading spinner while loading is true -->
      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
        <PulseLoader />
      </div>
      <!-- Show job listing while downloading -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <JobListing v-for="job in state.jobs.slice(0, showAll ? state.jobs.length : (props.limit || state.jobs.length))"
          :key="job.id"
          :job="job"/>
      </div>
    </div>
  </section>

  <section v-if="props.showButton && !showAll" class="m-auto max-w-lg px-6 mt-8">
    <button
      @click="showAll = true"
      class="block w-full bg-secondary text-white text-center py-4 px-6 rounded-xl hover:bg-secondary-dark transition duration-300"
    >
      View All Jobs
    </button>
  </section>
</div>
</template>