import { FC } from 'react';
import styles from './consultationStatus.module.scss';
import { ConsultationStatusEnum } from 'models/ConsultationStatus';
import { ConsultationStatusMapper } from 'util/consultationStatusMapper';

interface ConsultationStatusProps {
  status: ConsultationStatusEnum;
}

const ConsultationStatus: FC<ConsultationStatusProps> = ({ status }) => {
  const index = Object.keys(ConsultationStatusEnum).indexOf(status);
  const blue = 'containerBlue';
  const red = 'containerRed';
  const green = 'containerGreen';
  const yellow = 'containerYellow';
  const statusColorMapper = {
    0: yellow,
    '-1': green,
    2: blue,
    3: red,
  };

  return (
    <div
      style={{ height: 46, paddingLeft: 26, paddingRight: 26, width: 172 }}
      className={statusColorMapper[index] ? styles[statusColorMapper[index]] : styles.container}
    >
      <p className={styles.text}>{ConsultationStatusMapper(status)}</p>
    </div>
  );
};

export default ConsultationStatus;
