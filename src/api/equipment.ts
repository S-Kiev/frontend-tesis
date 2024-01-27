import { Equipment } from 'models/Equipment';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';

export const getEquipments = async (page: number, search: string) => {
  return await axiosDefaultConfig.get(routes.GET_EQUIPMENTS, {
    params: {
      'filters[$or][0][name][$containsi]': search,
      'filters[$or][1][id][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const createEquipment = async (equipment: Equipment) => {
  return await axiosDefaultConfig.post(routes.POST_EQUIPMENT, {
    data: equipment,
  });
};
