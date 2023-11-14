import { Role } from 'models/Roles';
const _token = 'clinic_tkn';
const _user_data = 'clinic_user_data';

export const storeToken = (token: string) => {
  localStorage.setItem(_token, token);
};

export const getToken = (): string | null => {
  return localStorage.getItem(_token);
};

export const removeToken = () => {
  localStorage.removeItem(_token);
};

interface UserData {
  id: number;
  username: string;
  email: string;
  role: Role;
}

export const setAuthenticatedUser = (userData: UserData) => {
  const parsedData = JSON.stringify(userData);
  localStorage.setItem(_user_data, parsedData);
};

export const getAuthenticatedUser = (): UserData | null => {
  const data = localStorage.getItem(_user_data);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};

export const removeAuthenticatedUser = () => {
  localStorage.removeItem(_user_data);
};

export const isLoggedIn = (): boolean => {
  return !!getToken() && !!getAuthenticatedUser();
};

export const resetStorageData = () => {
  removeAuthenticatedUser();
  removeToken();
};