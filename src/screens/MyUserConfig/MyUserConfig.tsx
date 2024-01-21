import { FC } from 'react';
import { ChevronLeft } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './MyUserConfig.module.scss';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getUser, getUserData } from 'api/users';

interface MyUserConfigProps {}

const MyUserConfig: FC<MyUserConfigProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.UserDataPorfile, id],
    queryFn: () => getUserData(id || ''),
  });

  const {
    data: userData,
    error: errorUserData,
    isLoading: isLoadingUserData,
  } = useQuery({
    queryKey: [QueryKeys.User, id],
    queryFn: () => getUser(id || ''),
  });

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
