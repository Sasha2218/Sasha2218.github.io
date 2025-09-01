<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

const user = ref(null);
const surname = ref('');
const name = ref('');
const email = ref('');
const password = ref('');
const error = ref('');

onMounted(() => {
  const userData = localStorage.getItem('user');
  if (userData) {
    user.value = JSON.parse(userData);
    surname.value = user.value.surname;
    name.value = user.value.name;
    email.value = user.value.email;
    password.value = user.value.password;
  }
});

async function handleUpdate(e) {
  e.preventDefault();
  error.value = '';
  if (!surname.value || !name.value || !email.value || !password.value) {
    error.value = 'Please fill in all fields.';
    toast.error('Please fill in all fields.');
    return;
  }
  try {
    // Update user in backend (json-server)
    await axios.patch(`http://localhost:8001/accounts/${user.value.id}`, {
      surname: surname.value,
      name: name.value,
      email: email.value,
      password: password.value
    });
    // Update localStorage
    const updatedUser = { ...user.value, surname: surname.value, name: name.value, email: email.value, password: password.value };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated!');
    // Optionally, reload or redirect
  } catch (e) {
    error.value = 'Error updating profile.';
    toast.error('Error updating profile.');
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="max-w-lg w-full p-12 bg-white rounded-xl shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-primary text-center">Settings</h1>
      <form @submit="handleUpdate" class="space-y-6">
        <div>
          <label for="surname" class="block mb-1 font-semibold">Surname</label>
          <input v-model="surname" type="text" id="surname" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label for="name" class="block mb-1 font-semibold">Name</label>
          <input v-model="name" type="text" id="name" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label for="email" class="block mb-1 font-semibold">Email</label>
          <input v-model="email" type="email" id="email" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label for="password" class="block mb-1 font-semibold">Password</label>
          <input v-model="password" type="password" id="password" class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition">Update</button>
      </form>
    </div>
  </div>
</template>
