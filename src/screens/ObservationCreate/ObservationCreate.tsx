import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './ObservationCreate.module.scss';
import ObservationCreateForm from 'components/ObservationCreateForm/ObservationCreateForm';
import { useGetConsultationData } from 'customHooks/useGetConsultationData';

interface ObservationCreateProps {}

const ObservationCreate: FC<ObservationCreateProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data } = useGetConsultationData(id || '');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className="d-flex align-items-center">
          <ChevronLeft
            size={35}
            className={styles.pointer}
            onClick={() => {
              navigate(-1);
            }}
          />
          <div className={styles.titleConteiner}>
            <h2 className={styles.headline}>Registro de Observaciones</h2>
            <p>De de alta observaciones para una consulta registrada en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>
        {<ObservationCreateForm consultationId={id || ''} customerId={data?.customer?.data?.id || ''} />}
      </div>
    </div>
  );
};

export default ObservationCreate;
