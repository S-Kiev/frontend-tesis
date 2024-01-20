import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';
const VALIDPASSWORD = 'Debe ingresar una contraseña valida';
const MAX50 = 'Máximo de 50 caracteres superado';

export const userSchema = {
  username: yup.string().trim().required(REQUIREDMESSAGE).max(50, MAX50),
  email: yup.string().email('Debe ingresar un email válido').required(REQUIREDMESSAGE),
  password: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .min(8, VALIDPASSWORD)
    .matches(/\d/, VALIDPASSWORD)
    .matches(/[A-Z]/, VALIDPASSWORD)
    .matches(/[^\w]/, VALIDPASSWORD),
  confirmPassword: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .oneOf([yup.ref('password')], 'Las contraseñas no coinciden'),
  name: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚÑñ: ’]*$/, 'El nombre no puede contener numeros ni caracteres especiales') //Revisar todos los regex
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
    .matches(/\d/, 'El documento deben contener solo números, no se deben ingresar puntos ni guiones'),
  cellphone: yup.string().trim().required(REQUIREDMESSAGE), //Ajustar una vez sepa salida del campo (!)
  city: yup.string().trim().required(REQUIREDMESSAGE),
  address: yup.string().trim().required(REQUIREDMESSAGE).max(100, 'Máximo de 100 caracteres superado'),
};
