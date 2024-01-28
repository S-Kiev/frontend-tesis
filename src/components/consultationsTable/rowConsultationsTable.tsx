import { FC } from 'react';
import styles from './consultationsTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ThreeDotsVertical, Eye, PencilSquare } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { ConsultationData } from 'models/Consultation';
import ConsultationStatus from 'components/consultationStatus/consultationStatus';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { ConsultationStatusEnum } from 'models/ConsultationStatus';

interface RowConsultationTableProps {
  consultationData: ConsultationData;
}

const RowConsultationTable: FC<RowConsultationTableProps> = ({ consultationData }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <tr key={consultationData?.id}>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{consultationData?.id}</p>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
          consultationData?.attributes?.customer?.data?.attributes?.name || '---'
        } ${consultationData?.attributes?.customer?.data?.attributes?.lastname || '---'}`}</p>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
            consultationData?.attributes?.since
              ? format(new Date(consultationData?.attributes?.since), 'dd-MM-yyyy')
              : '---'
          }`}</p>
          <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>
            {`Desde: ${
              consultationData?.attributes?.since
                ? format(new Date(consultationData?.attributes?.since), 'H:mm')
                : '---'
            }hs`}
          </p>
          <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>
            {`Hasta: ${
              consultationData?.attributes?.since
                ? format(new Date(consultationData?.attributes?.until), 'H:mm')
                : '---'
            }hs`}
          </p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
          consultationData?.attributes?.responsibleUser?.data?.attributes?.name || '---'
        } ${consultationData?.attributes?.responsibleUser?.data?.attributes?.lastname || '---'}`}</p>
      </td>
      <td className={styles.titleTd}>
        <ConsultationStatus status={consultationData?.attributes?.status} />
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 20, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/consultations/${consultationData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {user?.id === consultationData?.attributes?.responsibleUser?.data?.attributes?.userId &&
              ConsultationStatusEnum.pending === consultationData?.attributes?.status && (
                <>
                  <div
                    className={`${styles.option} mt-3`}
                    onClick={() => {
                      navigate(`/app/consultations/${consultationData?.id}/edit`);
                    }}
                  >
                    <PencilSquare />
                    <p>Editar consulta</p>
                  </div>
                </>
              )}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default RowConsultationTable;
