import { useGetConsultationData } from 'customHooks/useGetConsultationData';
import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface ConsultationEditProps {}

const ConsultationEdit: FC<ConsultationEditProps> = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetConsultationData(id || '');
  return <div>Consultation Edit</div>;
};

export default ConsultationEdit;
