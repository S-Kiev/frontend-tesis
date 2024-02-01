import { FC } from 'react';
import styles from './equipmentHistory.module.scss';
import { useNavigate } from 'react-router-dom';
import EquipmentStatus from 'components/equipmentStatus/equipmentStatus';
import { EquipmentHistoryItem } from 'models/equipmentHistory';
import { format } from 'date-fns';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';
import { Button } from 'react-bootstrap';
import { Eye, SlashCircle } from 'react-bootstrap-icons';

interface RowEquipmentHistoryTableProps {
  equipmentDataItem: EquipmentHistoryItem;
}

const RowEquipmentHistoryTable: FC<RowEquipmentHistoryTableProps> = ({ equipmentDataItem }) => {
  const navigate = useNavigate();

  return (
    <tr key={equipmentDataItem?.id}>
      <td className={styles.titleTd}>
        <EquipmentStatus status={equipmentDataItem?.attributes?.status} />
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.date}`}>
          {`${
            equipmentDataItem?.attributes?.since
              ? format(new Date(equipmentDataItem?.attributes?.since), 'dd-MM-yyyy H:mm')
              : '---'
          }hs`}
        </p>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.date}`}>
          {`${
            equipmentDataItem?.attributes?.until
              ? format(new Date(equipmentDataItem?.attributes?.until), 'dd-MM-yyyy H:mm')
              : '---'
          }hs`}
        </p>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          {equipmentDataItem?.attributes?.status === EquipmentStatusEnum.occupied && (
            <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>{`${
              equipmentDataItem?.attributes?.consultation?.data?.attributes?.responsibleUser?.data?.attributes?.name ||
              '---'
            } ${
              equipmentDataItem?.attributes?.consultation?.data?.attributes?.responsibleUser?.data?.attributes
                ?.lastname || '---'
            }`}</p>
          )}
        </div>
      </td>
      <td className={styles.titleTd}>
        {equipmentDataItem?.attributes?.status === EquipmentStatusEnum.occupied && (
          <Button
            variant="secondary"
            type="button"
            className="me-3"
            onClick={() => {
              navigate(`/app/consultations/${equipmentDataItem?.attributes?.consultation?.data?.id}`);
            }}
          >
            <Eye className="me-2" />
            Ver detalle consulta
          </Button>
        )}
        {equipmentDataItem?.attributes?.canceledRental && (
          <>
            <SlashCircle size={20} color="#dc3545" className="me-2" />
            <strong style={{ color: '#dc3545' }}>Alquiler Cancelado</strong>
          </>
        )}
      </td>
    </tr>
  );
};

export default RowEquipmentHistoryTable;
