import { FC } from 'react';
import styles from './equipmentStatus.module.scss';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';
import { equipmentStatusMapper } from 'util/equipmentStatusMapper';

interface EquipmentStatusProps {
  status: EquipmentStatusEnum;
}

const EquipmentStatus: FC<EquipmentStatusProps> = ({ status }) => {
  const index = Object.keys(EquipmentStatusEnum).indexOf(status);
  const blue = 'containerBlue';
  const red = 'containerRed';
  const green = 'containerGreen';
  const yellow = 'containerYellow';
  const statusColorMapper = {
    0: green,
    1: red,
    2: yellow,
    3: red,
    '-1': blue,
  };

  return (
    <div
      style={{ height: 46, paddingLeft: 26, paddingRight: 26, width: 172 }}
      className={statusColorMapper[index] ? styles[statusColorMapper[index]] : styles.container}
    >
      <p className={styles.text}>{equipmentStatusMapper(status)}</p>
    </div>
  );
};

export default EquipmentStatus;
