import { FC } from 'react';
import styles from './toast.module.scss';
import ErrorIcon from 'assets/ErrorToastIcon.svg';

interface ErrorToastProps {
  message: string;
}

const ErrorToast: FC<ErrorToastProps> = ({ message }) => {
  return (
    <div className={styles.toast}>
      <img src={ErrorIcon} alt="success" className={styles.img} />
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ErrorToast;
