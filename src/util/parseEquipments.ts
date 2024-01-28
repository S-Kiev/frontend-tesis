import { EquipmentData } from 'models/Equipment';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';

export const parseEquipments = (equipments: EquipmentData[]): { value: string; label: string; show: boolean }[] => {
  return equipments.map(item => {
    const { id, attributes } = item;
    const { name, status } = attributes;
    return { value: id.toString(), label: name, show: status !== EquipmentStatusEnum.outOfUse };
  });
};
