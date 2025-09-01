<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { RouterLink, useRouter } from "vue-router";
import axios from 'axios'

const email = ref('')
const password = ref('')
const error = ref('')
const toast = useToast()
const router = useRouter()

async function handleSubmit(e) {
  e.preventDefault()
  error.value = ''
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields.'
    toast.error('Please fill in all fields.')
    return
  }
  try {
    // Vérifier si le compte existe déjà
    const res = await axios.get(`http://localhost:8001/accounts?email=${encodeURIComponent(email.value)}&password=${encodeURIComponent(password.value)}`)
    if (res.data.length > 0) {
      localStorage.setItem('user', JSON.stringify(res.data[0]));
      toast.success('Connected successfully !');
      setTimeout(() => {
        router.push('/');
      }, 500);
      return;
    } else {
      error.value = 'Email or password incorrect.'
      toast.error('Email or password incorrect.')
    }
  } catch (e) {
    error.value = "Error during login."
    toast.error("Error during login.")
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[url('/img/bg-login-register.jpg')] bg-cover bg-center">
    <div class="max-w-lg w-full p-12 bg-white rounded-xl shadow-md">
      <h1 class="text-2xl font-bold mb-6 text-primary text-center">Log In</h1>
      <form @submit="handleSubmit" class="space-y-6">
        <div>
          <label for="email" class="block mb-1 font-semibold">Email</label>
          <input v-model="email" type="email" id="email" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div>
          <label for="password" class="block mb-1 font-semibold">Password</label>
          <input v-model="password" type="password" id="password" required class="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary" />
        </div>
        <div v-if="error" class="text-red-500 text-sm">{{ error }}</div>
        <button type="submit" class="w-full bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition">Log In</button>
      </form>
      <p class="mt-4 text-center text-gray-600">Don't have an account? <RouterLink to="/register" class="text-primary hover:underline">Register</RouterLink></p>
    </div>
  </div>
</template>