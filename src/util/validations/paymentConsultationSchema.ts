import * as yup from 'yup';

const REQUIREDMESSAGE = 'Este campo es requerido';

export const paymentConsultationSchema = {
  totalCost: yup.number().required(REQUIREDMESSAGE).min(1, REQUIREDMESSAGE),
  customerPayment: yup.number().required(REQUIREDMESSAGE),
};
