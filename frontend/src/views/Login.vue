<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const username = ref('')
const password = ref('')
const router = useRouter()
const auth = useAuthStore()

const handleLogin = async () => {
  try {
    await auth.login(username.value, password.value)
    await auth.fetchProfile()
    router.push('/profile')
  } catch (err) {
    alert('niepoprawny login lub hasło')
  }
}
</script>

<template>
  <v-container>
    <v-form @submit.prevent="handleLogin">
      <v-text-field v-model="username" label="Login" />
      <v-text-field v-model="password" type="password" label="Hasło" />
      <v-btn type="submit">Zaloguj</v-btn>
    </v-form>
  </v-container>
</template>
