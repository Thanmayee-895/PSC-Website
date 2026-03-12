import { requireAuth } from '../utils/auth-guard.js';
import { initNavbar } from '../components/navbar.js';
import { checkPassword, generatePassword } from '../api/password.js';

if (!requireAuth()) throw new Error('Not authenticated');

initNavbar();

const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');
const checkBtn = document.getElementById('checkBtn');
const strengthResult = document.getElementById('strengthResult');
const strengthBar = document.getElementById('strengthBar');
const strengthLevel = document.getElementById('strengthLevel');
const strengthScore = document.getElementById('strengthScore');
const feedbackList = document.getElementById('feedbackList');

const lengthInput = document.getElementById('lengthInput');
const generateBtn = document.getElementById('generateBtn');
const generatedPassword = document.getElementById('generatedPassword');
const generatedPasswordText = document.getElementById('generatedPasswordText');
const copyBtn = document.getElementById('copyBtn');

togglePassword.addEventListener('click', () => {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});

checkBtn.addEventListener('click', async () => {
  const password = passwordInput.value;
  if (!password) {
    alert('Please enter a password');
    return;
  }

  try {
    const result = await checkPassword(password);
    displayStrength(result);
  } catch (error) {
    alert(error.response?.data?.error || 'Failed to check password');
  }
});

generateBtn.addEventListener('click', async () => {
  const length = parseInt(lengthInput.value);
  
  try {
    const result = await generatePassword(length);
    generatedPasswordText.value = result.password;
    generatedPassword.style.display = 'block';
  } catch (error) {
    alert(error.response?.data?.error || 'Failed to generate password');
  }
});

copyBtn.addEventListener('click', () => {
  generatedPasswordText.select();
  document.execCommand('copy');
  copyBtn.textContent = 'Copied!';
  setTimeout(() => {
    copyBtn.textContent = 'Copy';
  }, 2000);
});

function displayStrength(result) {
  strengthResult.style.display = 'block';
  strengthLevel.textContent = result.strength;
  strengthScore.textContent = result.score;
  
  strengthBar.style.width = `${result.score}%`;
  strengthBar.className = 'strength-fill ' + getStrengthClass(result.strength);
  
  feedbackList.innerHTML = '';
  if (result.feedback && result.feedback.length > 0) {
    result.feedback.forEach(feedback => {
      const li = document.createElement('li');
      li.textContent = feedback;
      feedbackList.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Great password!';
    li.style.color = 'green';
    feedbackList.appendChild(li);
  }
}

function getStrengthClass(strength) {
  const map = {
    'Very Weak': 'very-weak',
    'Weak': 'weak',
    'Medium': 'medium',
    'Strong': 'strong',
    'Very Strong': 'very-strong'
  };
  return map[strength] || '';
}
