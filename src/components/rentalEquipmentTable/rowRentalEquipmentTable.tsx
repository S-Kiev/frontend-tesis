import { FC } from 'react';
import styles from './rentalEquipmentTable.module.scss';
import { format } from 'date-fns';
import { EquipmentHistoryDataRental } from 'models/equipmentHistory';
import { Button } from 'react-bootstrap';
import { SlashCircle } from 'react-bootstrap-icons';

interface RowRentalEquipmentTableProps {
  data: EquipmentHistoryDataRental;
}

const RowRentalEquipmentTable: FC<RowRentalEquipmentTableProps> = ({ data }) => {
  return (
    <tr key={data?.id}>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
            data?.attributes?.since ? format(new Date(data?.attributes?.since), 'dd-MM-yyyy H:mm') : '---'
          }hs`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
            data?.attributes?.until ? format(new Date(data?.attributes?.until), 'dd-MM-yyyy H:mm') : '---'
          }hs`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <Button variant="danger" type="button" onClick={() => {}}>
          <SlashCircle className="me-2" size={20} />
          Cancelar Alquiler
        </Button>
      </td>
    </tr>
  );
};

export default RowRentalEquipmentTable;
