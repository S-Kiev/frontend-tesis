import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';

export const changeStatusConsultingRoomSchema = {
  newStatus: yup.string().required(REQUIREDMESSAGE),
};
