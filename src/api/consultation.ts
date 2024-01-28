import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getConsultations = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATIONS, {
    params: {
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

/*
'filters[$or][1][id][$containsi]': search,
'filters[$or][0][name][$containsi]': search,
      'filters[$or][0][lastname][$containsi]': search,
      */
