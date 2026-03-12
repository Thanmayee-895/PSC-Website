import axios from 'axios';
import { getAuthHeaders } from './auth.js';

const API_URL = '/api/password';

export const checkPassword = async (password) => {
  const response = await axios.post(`${API_URL}/check`, { password }, { headers: getAuthHeaders() });
  return response.data;
};

export const generatePassword = async (length = 16) => {
  const response = await axios.post(`${API_URL}/generate`, { length }, { headers: getAuthHeaders() });
  return response.data;
};

export const getHistory = async (strongOnly = false) => {
  const url = strongOnly ? `${API_URL}/history?strongOnly=true` : `${API_URL}/history`;
  const response = await axios.get(url, { headers: getAuthHeaders() });
  return response.data;
};

export const clearHistory = async () => {
  const response = await axios.delete(`${API_URL}/history`, { headers: getAuthHeaders() });
  return response.data;
};
