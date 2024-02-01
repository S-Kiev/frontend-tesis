import { EquipmentStatusEnum } from 'models/EquipmentStatus';

export const equipmentStatusMapper = (status: EquipmentStatusEnum) => {
  switch (status) {
    case EquipmentStatusEnum.available:
      return 'Disponible';
    case EquipmentStatusEnum.broken:
      return 'Averiado';
    case EquipmentStatusEnum.occupied:
      return 'Ocupado';
    case EquipmentStatusEnum.outOfUse:
      return 'Fuera de uso';
    case EquipmentStatusEnum.rented:
      return 'Alquilado';
    default:
      return '';
  }
};
