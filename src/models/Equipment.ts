import { EquipmentStatusEnum } from './EquipmentStatus';

export interface EquipmentData {
  id: number;
  attributes: {
    name: string;
    brand: string;
    description: string;
    deactivationDate: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    status: EquipmentStatusEnum;
  };
}

export interface Equipment {
  name: string;
  brand: string;
  description: string;
  status: EquipmentStatusEnum;
}

export interface EquipmentEdit {
  equipmentId: number | string;
  name: string;
  brand: string;
  description: string;
}
