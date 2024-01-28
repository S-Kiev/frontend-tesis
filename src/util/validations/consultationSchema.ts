import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const MAX500 = 'Máximo de 500 caracteres superado';

export const consultationSchema = {
  customer: yup.number().required(REQUIREDMESSAGE),
  treatments: yup
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
  equipments: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        show: yup.boolean().required(),
      }),
    )
    .min(1, REQUIREDMESSAGE)
    .nullable()
    .required(REQUIREDMESSAGE),
  consultingRooms: yup
    .array()
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
        show: yup.boolean().required(),
      }),
    )
    .min(1, REQUIREDMESSAGE)
    .nullable()
    .required(REQUIREDMESSAGE),
  dateSinceConsultation: yup.string().required(REQUIREDMESSAGE),
  dateUntilConsultation: yup.string().required(REQUIREDMESSAGE),
  comments: yup.string().trim().max(500, MAX500).required(REQUIREDMESSAGE),
};
