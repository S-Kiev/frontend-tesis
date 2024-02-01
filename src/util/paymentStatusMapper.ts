import { PaymentStatusEnum } from 'models/paymentStatus';

export const paymentStatusMapper = (status: PaymentStatusEnum) => {
  switch (status) {
    case PaymentStatusEnum.total:
      return 'Pago total';
    case PaymentStatusEnum.partial:
      return 'Parcial';
    case PaymentStatusEnum.pending:
      return 'Pendiente';
    default:
      return '';
  }
};
