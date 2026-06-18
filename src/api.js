export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://anismanisbe.vercel.app';

export const apiFetch = (pathname, options) => {
  const url = `${API_BASE_URL}${pathname}`;
  return fetch(url, options);
};
