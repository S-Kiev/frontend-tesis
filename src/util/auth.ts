const _token = 'clinic_tkn';
const _user = 'persist:clinic-root';

export const storeToken = (token: string) => {
  localStorage.setItem(_token, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(_token);
};

export const removeToken = () => {
  localStorage.removeItem(_token);
};

const removeUser = () => {
  localStorage.removeItem(_user);
};

export const isLoggedIn = (): boolean => {
  return !!getToken();
};

export const resetStorageData = () => {
  removeToken();
  removeUser();
};
