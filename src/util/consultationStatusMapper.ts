import { ConsultationStatusEnum } from 'models/ConsultationStatus';

export const ConsultationStatusMapper = (status: ConsultationStatusEnum) => {
  switch (status) {
    case ConsultationStatusEnum.pending:
      return 'Pendiente';
    case ConsultationStatusEnum.inProgress:
      return 'En progreso';
    case ConsultationStatusEnum.finish:
      return 'Finalizada';
    case ConsultationStatusEnum.cancel:
      return 'Cancelada';
    default:
      return '';
  }
};
