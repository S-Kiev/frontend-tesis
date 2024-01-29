import { ConsultationStatusEnum } from './ConsultationStatus';
import { EquipmentStatusEnum } from './EquipmentStatus';

export interface EquipmentAttributes {
  name: string;
  brand: string;
  description: string;
  deactivationDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: string;
}

export interface Equipment {
  data: {
    id: number;
    attributes: EquipmentAttributes;
  };
}

export interface RentalAttributes {
  since: string;
  status: string;
  until: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  canceledRental: boolean;
  equipment: Equipment;
}

export interface EquipmentHistoryDataRental {
  id: number;
  attributes: RentalAttributes;
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

interface ResponsibleUserData {
  data: {
    id: number;
    attributes: ResponsibleUserAttributes;
  };
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
  responsibleUser: ResponsibleUserData;
}

interface ConsultationData {
  data: {
    id: number;
    attributes: ConsultationAttributes;
  };
}

interface EquipmentHistoryAttributes {
  name: string;
  brand: string;
  description: string;
  deactivationDate: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  status: EquipmentStatusEnum;
}

interface EquipmentData {
  data: {
    id: number;
    attributes: EquipmentHistoryAttributes;
  };
}

interface EquipmentHistoryItemAttributes {
  status: EquipmentStatusEnum;
  since: string;
  until: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  canceledRental: boolean;
  equipment: EquipmentData;
  consultation: ConsultationData;
}

export interface EquipmentHistoryItem {
  id: number;
  attributes: EquipmentHistoryItemAttributes;
}
