import api from './api';

export const login = async (credentials) => {
  const response = await api.post('token/', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await api.post('register/', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('user/me/');
  return response.data;
};

export const refreshToken = async () => {
  const refresh = localStorage.getItem('refresh_token');
  const response = await api.post('token/refresh/', { refresh });
  localStorage.setItem('access_token', response.data.access);
  return response.data.access;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};