import { requireAuth } from '../utils/auth-guard.js';
import { initNavbar } from '../components/navbar.js';
import { getSettings, updateSettings } from '../api/settings.js';

if (!requireAuth()) throw new Error('Not authenticated');

initNavbar();

const settingsForm = document.getElementById('settingsForm');
const message = document.getElementById('message');

// Load settings
(async () => {
  try {
    const { settings } = await getSettings();
    document.getElementById('autoLogoutTime').value = settings.autoLogoutTime;
    document.getElementById('passwordHistoryLimit').value = settings.passwordHistoryLimit;
    document.getElementById('enableNotifications').checked = settings.enableNotifications;
  } catch (error) {
    message.textContent = 'Failed to load settings';
    message.className = 'message error';
  }
})();

settingsForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  message.textContent = '';

  const formData = new FormData(settingsForm);
  const settingsData = {
    autoLogoutTime: parseInt(formData.get('autoLogoutTime')),
    passwordHistoryLimit: parseInt(formData.get('passwordHistoryLimit')),
    enableNotifications: formData.get('enableNotifications') === 'on'
  };

  try {
    await updateSettings(settingsData);
    message.textContent = 'Settings updated successfully!';
    message.className = 'message success';
  } catch (error) {
    message.textContent = error.response?.data?.error || 'Failed to update settings';
    message.className = 'message error';
  }
});
