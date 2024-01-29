import { ConsultingRoom, ConsultingRoomEdit } from 'models/ConsultingRoom';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';
import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';

export const getConsultingsRooms = async (page: number) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTINGS_ROOMS, {
    params: {
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const getConsultingsRoomsHook = async () => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTINGS_ROOMS_HOOK);
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

export const getHistoryConsultingRoom = async (page: number, id: string) => {
  return await axiosDefaultConfig.get(routes.GET_HISTORY_CONSULTING_ROOM, {
    params: {
      'filters[$and][0][consulting_room][id][$eq]': id,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const changeStatusConsultingRoom = async (consultingRoom: {
  consultingRoomId: string | number;
  status: ConsultingRoomStatusEnum | string;
}) => {
  return await axiosDefaultConfig.put(
    routes.PUT_CONSULTING_ROOM.replace('{id}', consultingRoom.consultingRoomId.toString()),
    {
      data: consultingRoom,
    },
  );
};

export const createConsultingRoomHistory = async (register: {
  consultingRoom: number | string;
  status: ConsultingRoomStatusEnum | string;
  since: string;
  until: string | null;
}) => {
  return await axiosDefaultConfig.post(routes.POST_HISTORY_CONSULTING_ROOM, {
    data: {
      consulting_room: register.consultingRoom,
      status: register.status,
      since: register.since,
      until: register.until,
    },
  });
};
