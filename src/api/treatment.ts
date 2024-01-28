import { Treatment } from 'models/Treatments';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getTreatments = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_TREATMENTS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][id][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const createTreatment = async (treatment: Treatment) => {
  return await axiosDefaultConfig.post(routes.POST_TREATMENT, {
    data: treatment,
  });
};
