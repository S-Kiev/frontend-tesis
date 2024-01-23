import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const MAX50 = 'Máximo de 50 caracteres superado';
const MAX500 = 'Máximo de 500 caracteres superado';

export const personalInfoSchema = {
  name: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ: ’]*$/, 'El nombre no puede contener numeros ni caracteres especiales')
    .max(50, MAX50),
  lastname: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ: ’]*$/, 'El apellido no puede contener numeros ni caracteres especiales')
    .max(50, MAX50),
  document: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .matches(/^[0-9]*$/, 'El documento deben contener solo números, no se deben ingresar puntos, espacios ni guiones'),
  birthdate: yup.string().required(REQUIREDMESSAGE),
  profession: yup.string().trim().max(50, MAX50),
};

export const contactInfoSchema = {
  cellphone: yup.string().trim().required(REQUIREDMESSAGE),
  email: yup.string().email('Debe ingresar un email válido'),
  city: yup.number().required(REQUIREDMESSAGE),
  address: yup.string().trim().required(REQUIREDMESSAGE).max(100, 'Máximo de 100 caracteres superado'),
  emergencyPhone: yup.string().trim().required(REQUIREDMESSAGE),
  howDidYouKnow: yup.string().trim().required(REQUIREDMESSAGE),
};

export const medicalInfoSchema = {
  reasonFirstVisit: yup.string().trim().max(500, MAX500),
  medication: yup.string().trim().max(500, MAX500),
  doctor: yup
    .string()
    .trim()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ: ’]*$/, 'El nombre no puede contener numeros ni caracteres especiales'),
  emergencyPhone: yup.string().trim(),
  suffersIllness: yup.string().trim().max(500, MAX500),
  columnProblem: yup.boolean(),
  operation: yup.string().trim().max(500, MAX500),
  heartProblem: yup.boolean(),
  cancer: yup.string().trim().max(500, MAX500),
  diu: yup.boolean(),
  metalImplants: yup.boolean(),
  hypertensive: yup.boolean(),
  varicoseVeins: yup.boolean(),
  coagulationProblems: yup.boolean(),
  comments: yup.string().trim().max(500, MAX500),
};

export const informedConsentSchema = {
  informedConsent: yup.mixed(),
};
