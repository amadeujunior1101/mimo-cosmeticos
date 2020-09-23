import axios from 'axios';

const api = axios.create({
  // baseURL: process.env.REACT_APP_API || 'http://localhost:3333',
  baseURL: 'http://localhost:3333',
  // baseURL: 'http://192.168.1.12:3333'
});

export default api;
