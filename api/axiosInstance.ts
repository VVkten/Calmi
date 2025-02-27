// axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://10.5.50.77:8000/api/', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
