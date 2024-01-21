import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import styles from './MyUserConfig.module.scss';

interface MyUserConfigProps {}

const MyUserConfig: FC<MyUserConfigProps> = () => {
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
            <h2 className={styles.headline}>Editar mi usuario</h2>
            <p>Modifica tu usuario de la aplicacion de Energía Natural</p>
          </div>
        </div>
      </div>
      <div className={styles.form}>{/*<UserCreateForm />*/}</div>
    </div>
  );
};

export default MyUserConfig;
