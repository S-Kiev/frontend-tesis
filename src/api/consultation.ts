import { consultationCreate, consultationEdit } from 'models/Consultation';
import { routes } from './apiRoutes';
import { axiosDefaultConfig } from './axiosConfig';
import { defaultPageSize } from './paginationConfig';
import { MeasurementsCreate, MeasurementsEdit, ObservationCreate, ObservationEdit } from 'models/Observations';
import { PaymentStatusEnum } from 'models/paymentStatus';

export const getConsultations = async (page: number, search: string, filter: { name: string | null }) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATIONS, {
    params: {
      'filters[$or][0][customer][name][$containsi]': search,
      'filters[$or][1][customer][lastname][$containsi]': search,
      'filters[$or][2][id][$containsi]': search,
      'pagination[page]': page,
      'pagination[pageSize]': defaultPageSize,
      'filters[$and][3][status][$eq]': filter.name,
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

export const getConsultationsInfoByConsultation = async (consultationId: string) => {
  return await axiosDefaultConfig.get(routes.GET_CONSULTATION_INFO, {
    params: {
      'filters[$and][0][consultation][id][$eq]': consultationId,
    },
  });
};

export const cancelConsultation = async (consultationId: number | string) => {
  return await axiosDefaultConfig.put(routes.PUT_CANCEL_CONSULTATION, {
    consultationId: consultationId,
  });
};

export const createObservation = async (observation: ObservationCreate) => {
  return await axiosDefaultConfig.post(routes.POST_OBSERVATION, {
    data: observation,
  });
};

export const createMeasurements = async (measurements: MeasurementsCreate) => {
  return await axiosDefaultConfig.post(routes.POST_MEASUREMENTS, {
    data: measurements,
  });
};

export const editObservation = async (observation: ObservationEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_OBSERVATION.replace('{id}', observation.observationId.toString()), {
    data: observation,
  });
};

export const editMeasurements = async (measurements: MeasurementsEdit) => {
  return await axiosDefaultConfig.put(routes.PUT_MEASUREMENTS.replace('{id}', measurements.measurementsId.toString()), {
    data: measurements,
  });
};

export const createPayment = async (payment: {
  consultation: number;
  customer: number;
  totalCost: number;
  paid: number;
  paymentStatus: PaymentStatusEnum | string;
}) => {
  return await axiosDefaultConfig.post(routes.POST_PAYMENT, {
    data: payment,
  });
};

export const SettleDebtPayment = async (paymentId: string | number) => {
  return await axiosDefaultConfig.put(routes.PUT_PAYMENT.replace('{id}', paymentId.toString()), {
    data: { paymentStatus: PaymentStatusEnum.total },
  });
};
