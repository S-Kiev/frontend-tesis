import { FC } from 'react';
import styles from './equipmentsTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical, Eye, PencilSquare } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { EquipmentData } from 'models/Equipment';
import EquipmentStatus from 'components/equipmentStatus/equipmentStatus';

interface RowEquipmentTableProps {
  equipmentData: EquipmentData;
  search: string;
}

const RowEquipmentTable: FC<RowEquipmentTableProps> = ({ equipmentData, search }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <tr key={equipmentData?.id}>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{equipmentData?.id}</p>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{equipmentData?.attributes?.name}</p>
          <p
            className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}
          >{`Marca: ${equipmentData?.attributes?.brand}`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <EquipmentStatus status={equipmentData?.attributes?.status} />
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 10, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/equipments/${equipmentData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {user?.role === Role.collaborator && (
              <div
                className={`${styles.option} mt-3`}
                onClick={() => {
                  navigate(`/app/equipments/${equipmentData?.id}/edit`);
                }}
              >
                <PencilSquare />
                <p>Editar equipo</p>
              </div>
            )}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default RowEquipmentTable;
