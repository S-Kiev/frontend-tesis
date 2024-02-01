import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const MAX500 = 'Máximo de 500 caracteres superado';

export const observationSchema = {
  observations: yup.string().trim().max(500, MAX500),
  images: yup.mixed().nullable(),
  measurements: yup.boolean().required(REQUIREDMESSAGE),
  highWaist: yup.number().when('measurements', ([measurements], schema) => {
    return measurements ? schema.required(REQUIREDMESSAGE) : schema;
  }),
  mean: yup.number().when('measurements', ([measurements], schema) => {
    return measurements ? schema.required(REQUIREDMESSAGE) : schema;
  }),
  navelLine: yup.number().when('measurements', ([measurements], schema) => {
    return measurements ? schema.required(REQUIREDMESSAGE) : schema;
  }),
  lowerBelly: yup.number().when('measurements', ([measurements], schema) => {
    return measurements ? schema.required(REQUIREDMESSAGE) : schema;
  }),
};
