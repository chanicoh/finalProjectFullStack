const BASE_URL = 'http://localhost:5000/api';

export const fetchWrapper = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};
