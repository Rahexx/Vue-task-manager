import { defineStore } from 'pinia';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

interface User {
  username: string;
  name: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as User | null
  }),
  actions: {
    async login(username: string, password: string) {
      const res = await axios.post(`${API}/auth/login`, { username, password });
      this.token = res.data.token;
      localStorage.setItem('token', this.token);
    },
    async fetchProfile() {
      const res = await axios.get(`${API}/auth/profile`, {
        headers: { Authorization: `Bearer ${this.token}` }
      });
      this.user = res.data;
    },
    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
    }
  }
});

