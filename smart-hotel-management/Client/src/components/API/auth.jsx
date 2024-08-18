import { fetchWrapper } from '../utils/fetchWrapper';

export const login = async (username, password) => {
  const response = await fetchWrapper('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  localStorage.setItem('token', response.token);
};

export const register = async (username, password, role) => {
  await fetchWrapper('/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password, role })
  });
};

export const fetchUsers = async () => {
  return await fetchWrapper('/auth/users');
};

export const deleteUser = async (user_id) => {
  await fetchWrapper(`/auth/users/${user_id}`, { method: 'DELETE' });
};
