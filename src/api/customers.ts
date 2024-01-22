import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';

export const getCustomers = async (search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMERS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][lastname][$containsi]': search,
    },
  });
};
