import axios from 'axios';
import register from './register';

axios.defaults.withCredentials = true;

export const API = axios.create({
  baseURL: 'http://localhost:8080',
});

export const RegisterAPI = register(API);
