import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConsultationCreate.module.scss';
import { ChevronLeft } from 'react-bootstrap-icons';
import ConsultationsCreateForm from 'components/consultationCreateForm/consultationCreateForm';

interface ConsultationProps {}

const Consultation: FC<ConsultationProps> = () => {
  const navigate = useNavigate();

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
            <h2 className={styles.headline}>Registro de consultas</h2>
            <p>Agende consultas para la clinica en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{<ConsultationsCreateForm />}</div>
    </div>
  );
};

export default Consultation;
