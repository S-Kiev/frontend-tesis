import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styles from './CustomerCreate.module.scss';

interface CustomerCreateProps {}

const CustomerCreate: FC<CustomerCreateProps> = () => {
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
            <h2 className={styles.headline}>Registro de clientes</h2>
            <p>De de alta clientes en el sistema</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{/*<UserCreateForm />*/}</div>
    </div>
  );
};

export default CustomerCreate;
