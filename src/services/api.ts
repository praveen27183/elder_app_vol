import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5050',
});

// Helper to set token
api.setToken = (token: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
