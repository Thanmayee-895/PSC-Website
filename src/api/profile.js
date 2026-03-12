import axios from 'axios';
import { getAuthHeaders } from './auth.js';

const API_URL = '/api/profile';

export const getProfile = async () => {
  const response = await axios.get(API_URL, { headers: getAuthHeaders() });
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await axios.put(API_URL, profileData, { headers: getAuthHeaders() });
  return response.data;
};
