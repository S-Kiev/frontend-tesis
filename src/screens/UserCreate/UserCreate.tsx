import { FC } from 'react';
import styles from './UserCreate.module.scss';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import UserCreateForm from 'components/userCreate/userCreateForm';

interface UserCreateProps {}

const UserCreate: FC<UserCreateProps> = () => {
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
            <h2 className={styles.headline}>Registro de usuarios</h2>
            <p>De de alta usuarios con rol colaborador en el sistema</p>
          </div>
        </div>
      </div>
      <div>
        <UserCreateForm />
      </div>
    </div>
  );
};

export default UserCreate;
