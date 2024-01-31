import { FC } from 'react';
import styles from './customerHistoryTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CircleFill, Eye } from 'react-bootstrap-icons';
import { ConsultationData } from 'models/Consultation';
import ConsultationStatus from 'components/consultationStatus/consultationStatus';
import PaymentStatus from 'components/paymentStatus/paymentStatus';

interface RowConsultationHistoryTableProps {
  dataItem: ConsultationData;
  report: boolean;
}

const RowConsultationHistoryTable: FC<RowConsultationHistoryTableProps> = ({ dataItem, report }) => {
  const navigate = useNavigate();
  const paymentTotal =
    dataItem?.attributes?.customerPayment?.attributes?.totalCost -
    dataItem?.attributes?.customerPayment?.attributes?.paid;
  return (
    <tr key={dataItem?.id}>
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
          <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>{`${
            dataItem?.attributes?.responsibleUser?.data?.attributes?.name || '---'
          } ${dataItem?.attributes?.responsibleUser?.data?.attributes?.lastname || '---'}`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        {dataItem?.attributes?.treatments.data?.map(item => {
          return (
            <div className="mb-1 d-flex align-items-center">
              <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
              <p className={`${styles.fw600} ${styles.date}`}>{item?.attributes?.name}</p>
            </div>
          );
        })}
      </td>
      <td className={styles.titleTd}>
        <ConsultationStatus status={dataItem?.attributes?.status} />
      </td>
      <td className={styles.titleTd}>
        {dataItem?.attributes?.customerPayment !== null && (
          <>
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={<Tooltip>{paymentTotal === 0 ? 'Sin deuda' : `Debe: $${paymentTotal}`}</Tooltip>}
            >
              <span>
                <PaymentStatus status={dataItem?.attributes?.customerPayment?.attributes?.paymentStatus || ''} />
              </span>
            </OverlayTrigger>
          </>
        )}
      </td>
      <td className={styles.titleTd}>
        {!report && (
          <Button
            variant="secondary"
            type="button"
            className="me-3"
            onClick={() => {
              navigate(`/app/consultations/${dataItem?.id}`);
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

export default RowConsultationHistoryTable;
