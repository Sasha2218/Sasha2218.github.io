<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

const form = ref({ email: '', password: '' })
const toast = useToast()
const router = useRouter()

async function handleSubmit() {
  if (!form.value.email || !form.value.password) {
    toast.error('Veuillez remplir tous les champs.')
    return
  }
  try {
    // Vérifier si l'email existe déjà
    const res = await axios.get(`http://localhost:8001/accounts?email=${encodeURIComponent(form.value.email)}`)
    if (res.data.length > 0) {
      toast.error('Un compte avec cet email existe déjà.')
      return
    }
    // Créer le compte
    await axios.post('http://localhost:8001/accounts', {
      email: form.value.email,
      password: form.value.password,
      surname: form.value.surname,
      name: form.value.name
    })
    toast.success('Compte créé avec succès !')
    router.push('/login')
  } catch (e) {
    toast.error("Erreur lors de la création du compte.")
  }
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-[url('/img/bg-login-register.jpg')] bg-cover bg-center">
    <div class="max-w-lg w-full p-12 bg-white rounded-xl shadow-md">
      <h1 class="text-2xl font-bold mb-4 text-primary">Register</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="email" class="block mb-1 font-semibold">Email</label>
          <input type="email" id="email" v-model="form.email" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary">
      </div>
      <div>
        <label for="password" class="block mb-1 font-semibold">Password</label>
        <input type="password" id="password" v-model="form.password" required class="mt-1 block border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary">
      </div>
      <h1 class="text-1xl font-bold mb-1 text-primary">Personal Informations :</h1>
      <div class="flex gap-4">
        <div class="w-1/2">
          <label for="surname" class="block mb-1 font-semibold">Surname</label>
          <input type="text" id="surname" v-model="form.surname" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary">
        </div>
        <div class="w-1/2">
          <label for="name" class="block mb-1 font-semibold">Name</label>
          <input type="text" id="name" v-model="form.name" required class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary">
        </div>
      </div>
      <button type="submit" class="w-full bg-primary hover:bg-secondary text-white px-4 py-2 rounded-md font-bold">Register</button>
    </form>
    </div>
  </div>
</template>
