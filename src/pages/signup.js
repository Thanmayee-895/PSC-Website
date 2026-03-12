import { signup, redirectIfAuthenticated } from '../api/auth.js';

redirectIfAuthenticated();

const signupForm = document.getElementById('signupForm');
const errorMessage = document.getElementById('errorMessage');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  errorMessage.textContent = '';

  const formData = new FormData(signupForm);
  const userData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    age: formData.get('age') ? parseInt(formData.get('age')) : undefined,
    email: formData.get('email'),
    password: formData.get('password'),
    bio: formData.get('bio')
  };

  try {
    await signup(userData);
    window.location.href = '/checker.html';
  } catch (error) {
    const errors = error.response?.data?.errors || [{ msg: 'Signup failed. Please try again.' }];
    errorMessage.textContent = errors.map(e => e.msg).join(', ');
  }
});
