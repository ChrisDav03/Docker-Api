import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:9000/api',
});

export default apiClient;