import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getConsultingsRooms = async (page: number) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTINGS_ROOMS, {
    params: {
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};
