import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getConsultations = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATIONS, {
    params: {
      'filters[$or][0][customer][name][$containsi]': search,
      'filters[$or][1][customer][lastname][$containsi]': search,
      'filters[$or][2][id][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};
