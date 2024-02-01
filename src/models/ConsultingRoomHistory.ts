import { ConsultationStatusEnum } from './ConsultationStatus';
import { ConsultingRoomStatusEnum } from './ConsultingRoomStatus';

interface ConsultingRoomAttributes {
  name: string;
  description: string;
  necessaryAction: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: ConsultingRoomStatusEnum;
}

interface ConsultingRoomData {
  data: {
    id: number;
    attributes: ConsultingRoomAttributes;
  };
}

interface ResponsibleUser {
  data: {
    id: number;
    attributes: ResponsibleUserAttributes;
  };
}

interface ResponsibleUserAttributes {
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
}

interface ConsultationAttributes {
  comments: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: ConsultationStatusEnum;
  since: string;
  until: string;
  notifyCustomer: boolean;
  notifyUser: boolean;
  responsibleUser: ResponsibleUser;
}

interface ConsultationData {
  data: {
    id: number;
    attributes: ConsultationAttributes;
  };
}

interface RentalAttributes {
  status: ConsultingRoomStatusEnum;
  since: string;
  until: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  consulting_room: ConsultingRoomData;
  consultation: ConsultationData;
}

export interface ConsultingRoomHistoryItem {
  id: number;
  attributes: RentalAttributes;
}
