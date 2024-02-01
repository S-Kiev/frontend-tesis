import { EquipmentStatusEnum } from 'models/EquipmentStatus';
import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';

export const changeStatusEquipmentSchema = {
  newStatus: yup.string().required(REQUIREDMESSAGE),
  since: yup.string().when('newStatus', ([newStatus], schema) => {
    return newStatus === EquipmentStatusEnum.rented ? schema.required(REQUIREDMESSAGE) : schema;
  }),
  until: yup.string().when('newStatus', ([newStatus], schema) => {
    return newStatus === EquipmentStatusEnum.rented ? schema.required(REQUIREDMESSAGE) : schema;
  }),
};
