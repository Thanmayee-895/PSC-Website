import { requireAuth } from '../utils/auth-guard.js';
import { initNavbar } from '../components/navbar.js';
import { getHistory, clearHistory } from '../api/password.js';

if (!requireAuth()) throw new Error('Not authenticated');

initNavbar();

const showAllBtn = document.getElementById('showAllBtn');
const showStrongBtn = document.getElementById('showStrongBtn');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const historyList = document.getElementById('historyList');

let currentFilter = false;

const loadHistory = async (strongOnly = false) => {
  try {
    historyList.innerHTML = '<p class="loading">Loading...</p>';
    const { history } = await getHistory(strongOnly);
    
    if (history.length === 0) {
      historyList.innerHTML = '<p class="empty">No passwords in history</p>';
      return;
    }

    historyList.innerHTML = history.map(item => `
      <div class="history-item">
        <div class="history-password">${maskPassword(item.password)}</div>
        <div class="history-strength ${getStrengthClass(item.strength)}">${item.strength}</div>
        <div class="history-type">${item.type}</div>
        <div class="history-date">${new Date(item.createdAt).toLocaleString()}</div>
      </div>
    `).join('');
  } catch (error) {
    historyList.innerHTML = '<p class="error">Failed to load history</p>';
  }
};

const maskPassword = (password) => {
  if (password.length <= 4) return '****';
  return password.substring(0, 2) + '*'.repeat(password.length - 4) + password.substring(password.length - 2);
};

const getStrengthClass = (strength) => {
  return strength.toLowerCase().replace(' ', '-');
};

showAllBtn.addEventListener('click', () => {
  currentFilter = false;
  showAllBtn.classList.add('active');
  showStrongBtn.classList.remove('active');
  loadHistory(false);
});

showStrongBtn.addEventListener('click', () => {
  currentFilter = true;
  showStrongBtn.classList.add('active');
  showAllBtn.classList.remove('active');
  loadHistory(true);
});

clearHistoryBtn.addEventListener('click', async () => {
  if (!confirm('Are you sure you want to clear all password history?')) return;
  
  try {
    await clearHistory();
    loadHistory(currentFilter);
  } catch (error) {
    alert('Failed to clear history');
  }
});

// Initial load
loadHistory();
