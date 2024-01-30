import { FC } from 'react';
import styles from './paymentStatus.module.scss';
import { PaymentStatusEnum } from 'models/paymentStatus';
import { paymentStatusMapper } from 'util/paymentStatusMapper';

interface PaymentStatusProps {
  status: PaymentStatusEnum;
}

const PaymentStatus: FC<PaymentStatusProps> = ({ status }) => {
  const index = Object.keys(PaymentStatusEnum).indexOf(status);
  const red = 'containerRed';
  const green = 'containerGreen';
  const yellow = 'containerYellow';
  const statusColorMapper = {
    0: green,
    1: yellow,
    3: red,
  };

  return (
    <div
      style={{ height: 46, paddingLeft: 26, paddingRight: 26, width: 172 }}
      className={statusColorMapper[index] ? styles[statusColorMapper[index]] : styles.container}
    >
      <p className={styles.text}>{paymentStatusMapper(status)}</p>
    </div>
  );
};

export default PaymentStatus;
