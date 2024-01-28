import { FC } from 'react';
import styles from './TrearmentCreate.module.scss';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'react-bootstrap-icons';
import TreatmentsCreateForm from 'components/treatmentsCreateForm/treatmentsCreateForm';

interface TrearmentCreateProps {}

const TrearmentCreate: FC<TrearmentCreateProps> = () => {
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
            <h2 className={styles.headline}>Registro de tratamientos</h2>
            <p>De de alta tratamientos para la clinica en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{<TreatmentsCreateForm />}</div>
    </div>
  );
};

export default TrearmentCreate;
