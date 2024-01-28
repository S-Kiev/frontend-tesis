import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const MAX50 = 'Máximo de 50 caracteres superado';
const MAX500 = 'Máximo de 500 caracteres superado';

export const treatmentsSchema = {
  name: yup.string().trim().required(REQUIREDMESSAGE).max(50, MAX50),
  description: yup.string().trim().max(500, MAX500),
};
