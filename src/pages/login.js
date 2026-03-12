import { login, redirectIfAuthenticated } from '../api/auth.js';

redirectIfAuthenticated();

const loginForm = document.getElementById('loginForm');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(loginForm);
  const credentials = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  try {
    await login(credentials);
    window.location.href = '/checker.html';
  } catch (error) {
    errorMessage.textContent = error.response?.data?.error || 'Login failed. Please try again.';
  }
});
