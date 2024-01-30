import { ConsultationData } from 'models/Consultation';
import { CustomerPayment } from 'models/CustomerPayment';

export const parseCustumerHistoryData = (consultations: ConsultationData[], paymentsData: CustomerPayment[]) => {
  let ConsultationPayments: any[] = [];
  if (consultations && paymentsData) {
    consultations?.map(consultation => {
      paymentsData?.map(payment => {
        if (consultation?.id === payment?.attributes?.consultation?.data?.id) {
          consultation.attributes.customerPayment = payment;
          ConsultationPayments.push(consultation);
        } else {
          consultation.attributes.customerPayment = null;
          ConsultationPayments.push(consultation);
        }
      });
    });
    return ConsultationPayments;
  }
  return [];
};
