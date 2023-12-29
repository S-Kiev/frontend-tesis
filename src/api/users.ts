import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getUsersData = async (search: string) => {
  return await axiosDefaultConfig.get(routes.GET_USERS, {
    params: {
      'filters[username][$containsi]': search,
    },
  });
};
