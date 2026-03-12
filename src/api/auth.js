import axios from 'axios';

const API_URL = '/api/auth';

export const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login.html';
};

export const getToken = () => localStorage.getItem('token');

export const isAuthenticated = () => !!getToken();

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`
});
