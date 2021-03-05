import localStorage from './localStorageHandle';

export default () => {
  const token = localStorage.getDataByKey('token');
  if (!token) return null;
  return JSON.parse(atob(token.split('.')[1])).payload;
};
