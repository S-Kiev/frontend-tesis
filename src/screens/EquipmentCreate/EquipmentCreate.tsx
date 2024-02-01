import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styles from './EquipmentCreate.module.scss';
import EquipmentCreateForm from 'components/equipmentCreateForm/equipmentCreateForm';

interface EquipmentCreateProps {}

const EquipmentCreate: FC<EquipmentCreateProps> = () => {
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
            <h2 className={styles.headline}>Registro de equipos</h2>
            <p>De de alta equipos para la clinica en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{<EquipmentCreateForm />}</div>
    </div>
  );
};

export default EquipmentCreate;
