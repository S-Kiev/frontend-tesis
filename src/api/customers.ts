import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getCustomers = async (search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMERS, {
    params: {
      'filters[name][$containsi]': search,
    },
  });
};
