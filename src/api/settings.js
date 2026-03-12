import axios from 'axios';
import { getAuthHeaders } from './auth.js';

const API_URL = '/api/settings';

export const getSettings = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const updateSettings = async (settingsData) => {
  const response = await axios.put(API_URL, settingsData, { headers: getAuthHeaders() });
  return response.data;
};
