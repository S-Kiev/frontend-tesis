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
    data: {
      blocked: userBlocked.blocked,
    },
  });
};
