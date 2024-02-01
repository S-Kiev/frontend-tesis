import { FC } from 'react';
import styles from './userStatus.module.scss';

interface UserStatusProps {
  status: boolean;
}

const UserStatus: FC<UserStatusProps> = ({ status }) => {
  const red = 'containerRed';
  const green = 'containerGreen';
  const statusColorMapper = {
    0: green,
    1: red,
  };

  return (
    <div
      style={{ height: 46, paddingLeft: 26, paddingRight: 26, width: 172 }}
      className={statusColorMapper[status ? 0 : 1] ? styles[statusColorMapper[status ? 0 : 1]] : styles.container}
    >
      <p className={styles.text}>{status ? 'Habilitado' : 'Bloqueado'}</p>
    </div>
  );
};

export default UserStatus;
