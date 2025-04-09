<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useTaskStore } from '../stores/task'

const taskStore = useTaskStore()
const newTask = ref('')
console.log('Task store', taskStore.tasks)
onMounted(() => {
  taskStore.fetchTask()
})

const add = () => {
  if (!newTask.value) return
  taskStore.addTask(newTask.value)
  newTask.value = ''
}

const remove = (id: number) => taskStore.deleteTask(id)
</script>

<template>
  <v-container>
    <v-form @submit.prevent="add">
      <v-text-field v-model="newTask" label="Nowe zadanie" />
      <v-btn type="submit">Dodaj</v-btn>
    </v-form>

    <v-list>
      <v-list-item v-for="task in taskStore.tasks" :key="task.id">
        <v-list-item-title>{{ task.text }}</v-list-item-title>
        <v-btn icon @click="remove(task.id)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-container>
</template>
