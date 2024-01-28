import { ConsultingRoom, ConsultingRoomEdit } from 'models/ConsultingRoom';
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

export const createConsultingRoom = async (consultingRoom: ConsultingRoom) => {
  return await axiosDefaultConfig.post(routes.POST_CONSULTING_ROOM, {
    data: consultingRoom,
  });
};

export const getConsultingRoom = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTING_ROOM.replace('{id}', id));
};

export const editConsultingRoom = async (consultingRoom: ConsultingRoomEdit) => {
  return await axiosDefaultConfig.put(
    routes.PUT_CONSULTING_ROOM.replace('{id}', consultingRoom.consultingRoomId.toString()),
    {
      data: consultingRoom,
    },
  );
};
