// src/services/api.js
// Centralised API layer — all server calls go through here

import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Response interceptor for consistent error handling ──
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message = err.response?.data?.message || 'Something went wrong. Please try again.';
    return Promise.reject(new Error(message));
  }
);

// ── Properties ──────────────────────────────────────────
export const propertiesApi = {
  getAll:            (params) => api.get('/properties', { params }),
  getById:           (id)     => api.get(`/properties/${id}`),
  getFeatured:       ()       => api.get('/properties/featured'),
  getPopularLocations: ()     => api.get('/properties/popular-locations'),
  getStats:          ()       => api.get('/properties/stats'),
};

// ── Agents ──────────────────────────────────────────────
export const agentsApi = {
  getAll:  ()   => api.get('/agents'),
  getById: (id) => api.get(`/agents/${id}`),
};

// ── Inquiries ───────────────────────────────────────────
export const inquiriesApi = {
  submit: (data) => api.post('/inquiry', data),
};

export default api;
