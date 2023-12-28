import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getUsersData = async (page: number, pageSize: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_USERS, {
    params: {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'filters[username][$contains]': search,
    },
  });
};
