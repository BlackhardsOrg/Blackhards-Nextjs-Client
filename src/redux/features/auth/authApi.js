import axios from 'axios';

const API_URL = 'http://localhost:8080';

const authApi = {
  login: (credentials) => axios.post(`${API_URL}/auth/login`, credentials),
  register: (userData) => axios.post(`${API_URL}/auth/register`, userData),
  forgottenPassword: (email) => axios.post(`${API_URL}/auth/forgotten-password`, { email }),
  resetPassword: (data) => axios.post(`${API_URL}/auth/reset-password`, data),
  verifyEmail: (params) => axios.get(`${API_URL}/auth/verify-email`, { params }),
  resendVerificationEmail: (email) => axios.post(`${API_URL}/auth/resend-verification-email`, { email }),
  logout: (token) => axios.post(`${API_URL}/auth/logout`, {}, {
    headers: { Authorization: `Bearer ${token}` }
  })
};

export default authApi;