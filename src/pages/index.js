import { redirectIfAuthenticated } from '../api/auth.js';

// Redirect to checker if already logged in
redirectIfAuthenticated();
