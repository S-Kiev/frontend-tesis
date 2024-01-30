import { number } from 'yup';
import { ConsultationStatusEnum } from './ConsultationStatus';
import { TreatmentGetData } from './Treatments';
import { EquipmentData } from './Equipment';
import { ConsultingRoomData } from './ConsultingRoom';

export interface ConsultationData {
  id: number;
  attributes: {
    comments: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    status: ConsultationStatusEnum;
    since: string;
    until: string;
    notifyCustomer: boolean;
    notifyUser: boolean;
    customer: {
      data: {
        id: number;
        attributes: {
          name: string;
          lastname: string;
          document: string;
          birthdate: string;
          cellphone: string;
          email: string;
          address: string;
          howDidYouKnow: string;
          profession: string;
          reasonFirstVisit: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      };
    };
    responsibleUser: {
      data: {
        id: number;
        attributes: {
          name: string;
          lastname: string;
          document: string;
          cellphone: string;
          address: string;
          deactivationDate: string | null;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
          userId: number;
        };
      };
    };
  };
}

export interface consultationCreate {
  responsibleUserId: number;
  customerId: number;
  dateSince: string;
  dateUntil: string;
  treatments: number[];
  equitments: number[];
  consultingsRooms: { id: number; dateSince: string; dateUntil: string }[];
  comments: string;
}

export interface consultationEdit {
  consultationId: number;
  responsibleUserId: number;
  customerId: number;
  dateSince: string;
  dateUntil: string;
  treatments: number[];
  equitments: number[];
  consultingsRooms: { id: number; dateSince: string; dateUntil: string }[];
  comments: string;
}

export interface consultationGetData {
  id: number | string;
  customer: {
    data: {
      id: number;
      attributes: {
        name: string;
        lastname: string;
        document: string;
        birthdate: string;
        cellphone: string;
        email: string;
        address: string;
        howDidYouKnow: string;
        profession: string;
        reasonFirstVisit: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      };
    };
  };
  treatments: { data: TreatmentGetData[] };
  equipments: { data: EquipmentData[] };
  consultingRooms: { data: ConsultingRoomData[] };
  responsibleUser: {
    data: {
      id: number;
      attributes: {
        name: string;
        lastname: string;
        document: string;
        cellphone: string;
        address: string;
        deactivationDate: string | null;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        userId: number;
      };
    };
  };
  comments: string;
  status: ConsultationStatusEnum;
  since: string;
  until: string;
  createdAt: string;
}
