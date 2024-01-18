import { FC } from 'react';
import styles from './userDataCard.module.scss';
import { roleNameMapper } from 'util/roleNameMapper';
import { format } from 'date-fns';
import { Role } from 'models/Roles';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';

interface UserDataCardProps {
  type: 'account' | 'user';
  data: any;
}

const UserDataCard: FC<UserDataCardProps> = ({ type, data }) => {
  const user = useSelector(selectUser);

  const dataField = (type: string, option1: any, option2: any) => {
    if (type === 'user') {
      return option1;
    } else {
      return option2;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <p className={styles.title}>{`DATOS ${type === 'account' ? 'DE LA CUENTA' : 'DEL USUARIO'}`}</p>
      </div>
      <div className={styles.bodyCard}>
        <div className={styles.text}>
          <p>{dataField(type, 'Documento', 'Nombre usuario')}</p>
          <strong>{dataField(type, data?.document || '---', data?.username || '---')}</strong>
        </div>
        <div className={styles.text}>
          <p>{dataField(type, 'Celular', 'Rol')}</p>
          <strong>{dataField(type, data?.cellphone || '---', roleNameMapper(data?.role?.name) || '---')}</strong>
        </div>
        {type === 'user' && (
          <div className={styles.text}>
            <p>Ciudad</p>
            <strong>{data?.city?.data?.attributes?.cityName || '---'}</strong>
          </div>
        )}
        {type === 'user' && (
          <div className={styles.text}>
            <p>Dirección</p>
            <strong>
              <div className={styles.dir}>{data?.address || '---'}</div>
            </strong>
          </div>
        )}
        {type === 'account' && user?.role === Role.superAdmin && (
          <div className={styles.text}>
            <p>Estado</p>
            <strong>{data?.blocked ? 'Bloqueado' : 'Habilitado'}</strong>
          </div>
        )}
        {type === 'account' && user?.role === Role.superAdmin && (
          <div className={styles.text}>
            <p>Fecha de alta</p>
            <strong>
              <div className={styles.dir}>
                {data?.createdAt ? format(new Date(data?.createdAt), 'dd.MM.yyyy') : '---'}
              </div>
            </strong>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDataCard;
