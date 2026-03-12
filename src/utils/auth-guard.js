import { isAuthenticated } from '../api/auth.js';

export const requireAuth = () => {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
};

export const redirectIfAuthenticated = () => {
  if (isAuthenticated()) {
    window.location.href = '/checker.html';
    return true;
  }
  return false;
};
