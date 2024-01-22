import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getCustomers = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CUSTOMERS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][lastname][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};
