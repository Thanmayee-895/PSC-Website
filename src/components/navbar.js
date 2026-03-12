import { logout, isAuthenticated } from '../api/auth.js';

export const initNavbar = () => {
  const logoutBtn = document.getElementById('logoutBtn');
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to logout?')) {
        logout();
      }
    });
  }

  // Highlight active page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || href === `/${currentPage}`) {
      link.classList.add('active');
    }
  });

  // Show/hide auth-specific elements
  if (!isAuthenticated()) {
    const authElements = document.querySelectorAll('.auth-required');
    authElements.forEach(el => el.style.display = 'none');
  }
};
