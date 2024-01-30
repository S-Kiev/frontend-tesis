import { consultationCreate } from 'models/Consultation';
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
