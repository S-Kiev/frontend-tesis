import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ConsultingRoomCreate.module.scss';
import { ChevronLeft } from 'react-bootstrap-icons';
import ConsultingRoomForm from 'components/consultingRoomForm/consultingRoomForm';

interface ConsultingRoomCreateProps {}

const ConsultingRoomCreate: FC<ConsultingRoomCreateProps> = () => {
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
            <h2 className={styles.headline}>Registro de consultorios</h2>
            <p>De de alta consultorios en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{<ConsultingRoomForm />}</div>
    </div>
  );
};

export default ConsultingRoomCreate;
