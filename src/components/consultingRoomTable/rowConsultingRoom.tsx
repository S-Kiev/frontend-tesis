import { FC } from 'react';
import styles from './consultingRoomTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical, Eye, PencilSquare, ExclamationDiamondFill } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { ConsultingRoomData } from 'models/ConsultingRoom';
import ConsultingRoomStatus from 'components/consultingRoomStatus/consultingRoomStatus';

interface RowConsultingRoomProps {
  consultingRoomData: ConsultingRoomData;
}

const RowConsultingRoom: FC<RowConsultingRoomProps> = ({ consultingRoomData }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <tr key={consultingRoomData?.id}>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{consultingRoomData?.id}</p>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.textEllipsis}`}>{consultingRoomData?.attributes?.name}</p>
      </td>
      <td className={styles.titleTd}>
        {consultingRoomData?.attributes?.necessaryAction !== null &&
          consultingRoomData?.attributes?.necessaryAction !== '' && (
            <ExclamationDiamondFill size={25} color="#dc3545" />
          )}
      </td>
      <td className={styles.titleTd}>
        <ConsultingRoomStatus status={consultingRoomData?.attributes?.status} />
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 10, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/consultingsRooms/${consultingRoomData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {user?.role === Role.superAdmin && (
              <div
                className={`${styles.option} mt-3`}
                onClick={() => {
                  navigate(`/app/consultingsRooms/${consultingRoomData?.id}/edit`);
                }}
              >
                <PencilSquare />
                <p>Editar consultorio</p>
              </div>
            )}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default RowConsultingRoom;
