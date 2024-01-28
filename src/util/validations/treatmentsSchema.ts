import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const MAX50 = 'Máximo de 50 caracteres superado';
const MAX500 = 'Máximo de 500 caracteres superado';

export const treatmentsSchema = {
  name: yup.string().trim().required(REQUIREDMESSAGE).max(50, MAX50),
  equipments: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        show: yup.boolean().required(),
      }),
    )
    .nullable(),
  consultingRooms: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      }),
    )
    .min(1, REQUIREDMESSAGE)
    .nullable()
    .required(REQUIREDMESSAGE),
  description: yup.string().trim().max(500, MAX500),
};
