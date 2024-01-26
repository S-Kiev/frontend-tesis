import { ConsultingRoomStatusEnum } from './ConsultingRoomStatus';

export interface ConsultingRoomData {
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
