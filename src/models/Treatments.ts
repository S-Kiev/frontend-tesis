import { ConsultingRoomStatusEnum } from './ConsultingRoomStatus';
import { EquipmentStatusEnum } from './EquipmentStatus';

export interface TreatmentsData {
  id: number;
  attributes: {
    name: string;
    description: string;
    deactivationDate: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface Treatment {
  name: string;
  description: string;
  equipments: (number | undefined)[];
  consultingRooms: (number | undefined)[];
}

export interface TreatmentEdit {
  treatmentId: number | string;
  name: string;
  description: string;
  equipments: (number | undefined)[];
  consultingRooms: (number | undefined)[];
}

export interface TreatmentGetData {
  id: number;
  attributes: {
    name: string;
    description: string;
    deactivationDate: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    equipments: {
      data: Equipment[];
    };
    consultingRooms: {
      data: ConsultingRoom[];
    };
  };
}

export interface Equipment {
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

export interface ConsultingRoom {
  id: number;
  attributes: {
    name: string;
    description: string;
    necessaryAction: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    status: ConsultingRoomStatusEnum;
  };
}
