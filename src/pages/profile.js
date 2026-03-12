import { requireAuth } from '../utils/auth-guard.js';
import { initNavbar } from '../components/navbar.js';
import { getProfile, updateProfile } from '../api/profile.js';

if (!requireAuth()) throw new Error('Not authenticated');

initNavbar();

const profileForm = document.getElementById('profileForm');
const message = document.getElementById('message');

// Load profile data
(async () => {
  try {
    const { user } = await getProfile();
    document.getElementById('firstName').value = user.firstName || '';
    document.getElementById('lastName').value = user.lastName || '';
    document.getElementById('age').value = user.age || '';
    document.getElementById('email').value = user.email || '';
    document.getElementById('bio').value = user.bio || '';
  } catch (error) {
    message.textContent = 'Failed to load profile';
    message.className = 'message error';
  }
})();

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const formData = new FormData(profileForm);
  const profileData = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    age: formData.get('age') ? parseInt(formData.get('age')) : undefined,
    email: formData.get('email'),
    bio: formData.get('bio')
  };

  try {
    await updateProfile(profileData);
    message.textContent = 'Profile updated successfully!';
    message.className = 'message success';
  } catch (error) {
    message.textContent = error.response?.data?.error || 'Failed to update profile';
    message.className = 'message error';
  }
});
