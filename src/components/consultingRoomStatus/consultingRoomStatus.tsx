import { FC } from 'react';
import styles from './equipmentStatus.module.scss';
import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';
import { ConsultingRoomStatusMapper } from 'util/consultingRoomStatusMapper';

interface ConsultingRoomStatusProps {
  status: ConsultingRoomStatusEnum;
}

const ConsultingRoomStatus: FC<ConsultingRoomStatusProps> = ({ status }) => {
  const index = Object.keys(ConsultingRoomStatus).indexOf(status);
  const blue = 'containerBlue';
  const red = 'containerRed';
  const green = 'containerGreen';
  const statusColorMapper = {
    0: green,
    1: red,
    2: blue,
  };

  return (
    <div
      style={{ height: 46, paddingLeft: 26, paddingRight: 26, width: 172 }}
      className={statusColorMapper[index] ? styles[statusColorMapper[index]] : styles.container}
    >
      <p className={styles.text}>{ConsultingRoomStatusMapper(status)}</p>
    </div>
  );
};

export default ConsultingRoomStatus;
