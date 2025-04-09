<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const auth = useAuthStore()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<template>
  <v-container>
    <div v-if="auth.user">
      <h2>Witaj, {{ auth.user.name }}</h2>
      <p>Login: {{ auth.user.username }}</p>
      <v-btn @click="logout">Wyloguj</v-btn>
    </div>
  </v-container>
</template>
