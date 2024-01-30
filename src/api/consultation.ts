import { consultationCreate, consultationEdit } from 'models/Consultation';
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

export const getConsultationsByCustomer = async (page: number, customerId: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATIONS, {
    params: {
      'filters[$and][0][customer][id][$eq]': customerId,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
    },
  });
};

export const createConsultation = async (consultation: consultationCreate) => {
  return await axiosDefaultConfig.post(routes.POST_CONSULTATION, {
    responsibleUserId: consultation.responsibleUserId,
    customerId: consultation.customerId,
    dateSince: consultation.dateSince,
    dateUntil: consultation.dateUntil,
    treatments: consultation.treatments,
    equitments: consultation.equitments,
    consultingsRooms: consultation.consultingsRooms,
    comments: consultation.comments,
  });
};

export const getConsultation = async (id: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATION.replace('{id}', id));
};

export const getHistoryEquipmentConsultation = async (consultationId: string) => {
  return await axiosDefaultConfig.get(routes.GET_HISTORY_EQUIPMENTS, {
    params: {
      'filters[$and][0][consultation][id][$eq]': consultationId,
    },
  });
};

export const getHistoryConsultingRoomConsultation = async (consultationId: string) => {
  return await axiosDefaultConfig.get(routes.GET_HISTORY_CONSULTING_ROOM, {
    params: {
      'filters[$and][0][consultation][id][$eq]': consultationId,
    },
  });
};

export const editConsultation = async (consultation: consultationEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_CONSULTATION, {
    consultationId: consultation.consultationId,
    responsibleUserId: consultation.responsibleUserId,
    customerId: consultation.customerId,
    dateSince: consultation.dateSince,
    dateUntil: consultation.dateUntil,
    treatments: consultation.treatments,
    equitments: consultation.equitments,
    consultingsRooms: consultation.consultingsRooms,
    comments: consultation.comments,
    notifyCustomer: true,
    notifyUser: true,
  });
};
