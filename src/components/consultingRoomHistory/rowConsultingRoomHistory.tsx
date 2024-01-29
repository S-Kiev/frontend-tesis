import { FC } from 'react';
import styles from './consultingRoomHistory.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button } from 'react-bootstrap';
import { Eye, SlashCircle } from 'react-bootstrap-icons';
import { ConsultingRoomHistoryItem } from 'models/ConsultingRoomHistory';
import ConsultingRoomStatus from 'components/consultingRoomStatus/consultingRoomStatus';
import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';

interface RowConsultingRoomHistoryTableProps {
  dataItem: ConsultingRoomHistoryItem;
}

const RowConsultingRoomHistoryTable: FC<RowConsultingRoomHistoryTableProps> = ({ dataItem }) => {
  const navigate = useNavigate();

  return (
    <tr key={dataItem?.id}>
      <td className={styles.titleTd}>
        <ConsultingRoomStatus status={dataItem?.attributes?.status} />
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.date}`}>
          {`${
            dataItem?.attributes?.since ? format(new Date(dataItem?.attributes?.since), 'dd-MM-yyyy H:mm') : '---'
          }hs`}
        </p>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.date}`}>
          {`${
            dataItem?.attributes?.until ? format(new Date(dataItem?.attributes?.until), 'dd-MM-yyyy H:mm') : '---'
          }hs`}
        </p>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          {dataItem?.attributes?.status === ConsultingRoomStatusEnum.occupied && (
            <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>{`${
              dataItem?.attributes?.consultation?.data?.attributes?.responsibleUser?.data?.attributes?.name || '---'
            } ${
              dataItem?.attributes?.consultation?.data?.attributes?.responsibleUser?.data?.attributes?.lastname || '---'
            }`}</p>
          )}
        </div>
      </td>
      <td className={styles.titleTd}>
        {dataItem?.attributes?.status === ConsultingRoomStatusEnum.occupied && (
          <Button
            variant="secondary"
            type="button"
            className="me-3"
            onClick={() => {
              navigate(`/app/consultations/${dataItem?.attributes?.consultation?.data?.id}`);
            }}
          >
            <Eye className="me-2" />
            Ver detalle consulta
          </Button>
        )}
      </td>
    </tr>
  );
};

export default RowConsultingRoomHistoryTable;
