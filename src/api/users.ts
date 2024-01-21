import { User, UserData, UserDataEdit } from 'models/User';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getUsersData = async (search: string) => {
  return await axiosDefaultConfig.get(routes.GET_USERS, {
    params: {
      'filters[username][$containsi]': search,
    },
  });
};

export const getUserData = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_USER_DATA.replace('{id}', id));
};

export const getUser = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_USER.replace('{id}', id));
};

export const changeStateUser = async (userBlocked: { userId: string; blocked: boolean }) => {
  return await axiosDefaultConfig.put(routes.PUT_USER.replace('{id}', userBlocked.userId), {
    blocked: userBlocked.blocked,
  });
};

export const createUser = async (user: User) => {
  return await axiosDefaultConfig.post(routes.POST_USER, {
    username: user.username,
    email: user.email,
    password: user.password,
    role: user.role,
    confirmed: user.confirmed,
  });
};

export const createUserData = async (userData: UserData) => {
  return await axiosDefaultConfig.post(routes.POST_USER_DATA, {
    data: userData,
  });
};

export const editUser = async (user: { username: string; email: string; userId: string }) => {
  return await axiosDefaultConfig.put(routes.PUT_USER.replace('{id}', user.userId), {
    username: user.username,
    email: user.email,
  });
};

export const editUserData = async (userData: UserDataEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_USER_DATA.replace('{id}', userData.userId.toString()), {
    data: userData,
  });
};

export const editPassword = async (passwordData: {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
}) => {
  return await axiosDefaultConfig.post(routes.POST_PASSWORD, {
    password: passwordData.password,
    currentPassword: passwordData.currentPassword,
    passwordConfirmation: passwordData.passwordConfirmation,
  });
};
