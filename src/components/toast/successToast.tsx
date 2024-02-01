import { FC } from 'react';
import styles from './toast.module.scss';
import SuccessIcon from 'assets/SuccessToastIcon.svg';
import { format } from 'date-fns';

interface SuccessToastProps {
  message: string;
  boldMsg?: string;
  hour?: boolean;
}

const SuccessToast: FC<SuccessToastProps> = ({ boldMsg, message, hour }) => {
  return (
    <div className={styles.toast}>
      <img src={SuccessIcon} alt="success" className={`${styles.success} ${styles.img}`} />
      <div>
        <p>
          {boldMsg && <span className={styles.bold}>{boldMsg + ' '} </span>} {message}
        </p>
        {hour && <p className={styles.textSuccess}>Hoy {format(Date.now(), 'HH:mm aaa')}</p>}
      </div>
    </div>
  );
};

export default SuccessToast;
