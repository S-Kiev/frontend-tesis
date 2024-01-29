import { Equipment, EquipmentEdit } from 'models/Equipment';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';

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

export const getEquipmentsHook = async () => {
  return await axiosDefaultConfig.get(routes.GET_EQUIPMENTS_HOOK);
};

export const getPendingRentEquipments = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_PENDING_RENT_EQUIPMENT, {
    params: {
      'filters[$and][0][status][$containsi]': EquipmentStatusEnum.rented,
      'filters[$and][1][equipment][id][$containsi]': id,
      'filters[$and][2][since][$gt]': new Date(),
    },
  });
};

export const createEquipment = async (equipment: Equipment) => {
  return await axiosDefaultConfig.post(routes.POST_EQUIPMENT, {
    data: equipment,
  });
};

export const getEquipment = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_EQUIPMENT.replace('{id}', id));
};

export const editEquipment = async (equipment: EquipmentEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_EQUIPMENT.replace('{id}', equipment.equipmentId.toString()), {
    data: equipment,
  });
};
