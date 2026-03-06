import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL || ''}/api/products`,
  headers: { 'Content-Type': 'application/json' },
});

export const generateMetadata = (title, description) =>
  API.post('/generate', { title, description });

export const saveProduct = (productData) =>
  API.post('/save', productData);

export const getProducts = () =>
  API.get('/');

export default API;
