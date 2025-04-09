import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import axios from 'axios'
const API = import.meta.env.VITE_API_BASE_URL

interface Task {
  id: number
  text: string
}

export const useTaskStore = defineStore('task', {
  state: () => ({ tasks: [] as Task[] }),
  actions: {
    async fetchTask() {
      const auth = useAuthStore()
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.tasks = res.data
    },
    async addTask(text: string) {
      const auth = useAuthStore()
      const res = await axios.post(
        `${API}/tasks`,
        { text },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        },
      )
      this.tasks.push(res.data)
    },
    async deleteTask(id: number) {
      const auth = useAuthStore()
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${auth.token}` },
      })
      this.tasks = this.tasks.filter((task) => task.id !== id)
    },
  },
})
