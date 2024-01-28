import { EquipmentData } from 'models/Equipment';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';

export const parseEquipments = (equipments: EquipmentData[]) => {
  return equipments.map(item => {
    const { id, attributes } = item;
    const { name, status } = attributes;
    return { value: id, label: name, show: status !== EquipmentStatusEnum.outOfUse };
  });
};
