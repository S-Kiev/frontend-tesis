import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';

export const ConsultingRoomStatusMapper = (status: ConsultingRoomStatusEnum) => {
  switch (status) {
    case ConsultingRoomStatusEnum.available:
      return 'Disponible';
    case ConsultingRoomStatusEnum.occupied:
      return 'Ocupado';
    case ConsultingRoomStatusEnum.outOfUse:
      return 'Fuera de servicio';
    default:
      return '';
  }
};
