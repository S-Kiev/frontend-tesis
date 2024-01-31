import styles from './toast.module.scss';
import { FC } from 'react';
import ErrorIcon from 'assets/ErrorToastIcon.svg';
import SuccessIcon from 'assets/SuccessToastIcon.svg';
import format from 'date-fns/format';

interface NotificationToastExportProps {
  type: 'error' | 'success';
  reload?: Function;
}

export const NotificationToastExport: FC<NotificationToastExportProps> = ({ type, reload }) => {
  if (type === 'error' && reload) {
    return (
      <div className={styles.toast}>
        <img src={ErrorIcon} alt="error" className={`${styles.error} ${styles.img}`} />
        <div>
          <p>Ha ocurrido un error en la descarga</p>
          <p className={styles.textError} onClick={() => reload()}>
            Intenta nuevamente
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.toast}>
        <img src={SuccessIcon} alt="success" className={`${styles.success} ${styles.img}`} />
        <div>
          <p>Reporte descargado exitosamente</p>
          <p className={styles.textSuccess}>Hoy {format(Date.now(), 'HH:mm aaa')}</p>
        </div>
      </div>
    );
  }
};
