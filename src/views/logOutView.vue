
<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();

onMounted(() => {
  localStorage.removeItem('user');
  toast.info('Disconnected successfully !');
  setTimeout(() => {
    router.replace('/');
  }, 500);
});
</script>

<template>
  <section>
    <div class="container m-auto py-6 px-6 text-center text-white">
      Déconnexion en cours...
    </div>
  </section>
</template>