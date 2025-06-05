// src/api/auth.ts
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const loginUser = (credentials: { username: string; password: string }) =>
    axios.post(`${API_BASE}/auth/login`, credentials);

export const signupUser = (data: {
    username: string;
    email: string;
    password: string;
    fullName?: string;
}) => axios.post(`${API_BASE}/auth/signup`, data);