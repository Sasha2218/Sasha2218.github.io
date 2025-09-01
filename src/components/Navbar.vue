<script setup>
import { ref, onMounted, watch, computed, onUnmounted } from 'vue'
import { RouterLink, useRoute } from "vue-router";
import logo from "@/assets/img/logo.png";
import logOutView from "@/views/logOutView.vue";

const dropdownOpen = ref(false);

function handleClickOutside(event) {
  const dropdown = document.getElementById('user-dropdown');
  if (dropdown && !dropdown.contains(event.target)) {
    dropdownOpen.value = false;
  }
}
onMounted(() => {
  updateUserFromStorage();
  window.addEventListener('storage', updateUserFromStorage);
  document.addEventListener('click', handleClickOutside);
});
onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

const user = ref(null);

function updateUserFromStorage() {
  try {
    const userData = localStorage.getItem('user');
    if (userData) {
      user.value = JSON.parse(userData);
    } else {
      user.value = null;
    }
  } catch (e) {
    user.value = null;
  }
}

const userDisplayName = computed(() => {
  if (user.value && user.value.surname && user.value.name) {
    return `${user.value.surname} ${user.value.name}`;
  }
  return null;
});

const route = useRoute();
onMounted(() => {
  updateUserFromStorage();
  window.addEventListener('storage', updateUserFromStorage);
});
watch(() => route.path, updateUserFromStorage);


const isActiveLink = (routePath) => {
  const route = useRoute();
  return route.path === routePath;
};

function logout() {
  localStorage.removeItem('user');
  user.value = null;
  // Optionally reload or redirect to home
  window.location.href = '/';
}

console.log('Navbar mounted, user:', user.value);

</script>
<template>
     <nav class="bg-secondary border-b border-secondary">
      <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div class="flex h-20 items-center justify-between">
          <div
            class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
          >
            <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
              <img class="h-10 w-auto" 
              :src="logo" alt="Vue Jobs" />
              <span class="hidden md:block text-white text-2xl font-bold ml-2"
                >Vue Jobs</span
              >
            </RouterLink>
            <div class="md:ml-auto">
              <div class="flex space-x-2">
                <RouterLink
                  to="/"
                  :class="[
                    isActiveLink('/') 
                    ? 'bg-primary-dark' 
                    : 'hover:bg-primary-dark hover:text-white', 
                    'text-white', 
                    'px-3',
                    'py-2', 
                    'rounded-md',
                    ]"
                  >Home</RouterLink
                >
                <RouterLink
                  to="/jobs"
                  :class="[
                    isActiveLink('/jobs') 
                    ? 'bg-primary-dark' 
                    : 'hover:bg-gray-900 hover:text-white', 
                    'text-white', 
                    'px-3',
                    'py-2', 
                    'rounded-md',
                    ]"
                  >Jobs</RouterLink
                >
                <RouterLink
                  to="/jobs/add"
                  :class="[
                    isActiveLink('/jobs/add') 
                    ? 'bg-primary-dark' 
                    : 'hover:bg-gray-900 hover:text-white', 
                    'text-white', 
                    'px-3',
                    'py-2', 
                    'rounded-md',
                    ]"
                  >Add Job</RouterLink
                >
                <div v-if="userDisplayName" class="relative" id="user-dropdown">
                  <button
                    @click="dropdownOpen = !dropdownOpen"
                    class="flex items-center text-white font-bold px-3 py-2 gap-2 focus:outline-none"
                  >
                    {{ userDisplayName }}
                    <svg :class="[dropdownOpen ? 'rotate-180' : '', 'w-4 h-4 transition-transform']" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                    <div v-if="dropdownOpen" class="absolute right-0 mt-2 w-40 bg-black rounded shadow-lg z-50">
                      <RouterLink
                        to="/logout"
                        class="block w-full text-left px-4 py-2 text-white hover:bg-primary transition-colors duration-150"
                      >Log Out</RouterLink>
                       <RouterLink
                        to="/setting"
                        class="block w-full text-left px-4 py-2 text-white hover:bg-primary transition-colors duration-150"
                      >Settings</RouterLink>
                    </div>
                </div>
                <template v-else>
                  <RouterLink
                    to="/login"
                    :class="[
                      isActiveLink('/login') 
                      ? 'bg-primary-dark' 
                      : 'hover:bg-gray-900 hover:text-white', 
                      'text-white',
                      'px-3',
                      'py-2',
                      'rounded-md',
                    ]"
                  >Log In</RouterLink>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
</template>