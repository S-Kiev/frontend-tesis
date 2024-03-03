import { FC } from 'react';
import styles from './customersTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical, Eye, PencilSquare } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { CustomerData } from 'models/Customer';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';

interface RowCustomersTableProps {
  customerData: CustomerData;
  search: string;
}

const RowCustomersTable: FC<RowCustomersTableProps> = ({ customerData, search }) => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <tr key={customerData?.id}>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{customerData?.id}</p>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p
            className={`${styles.fw600} ${styles.textEllipsis}`}
          >{`${customerData?.attributes?.name} ${customerData?.attributes?.lastname}`}</p>
          <p
            className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}
          >{`CI: ${customerData?.attributes?.document}`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`+${customerData?.attributes?.cellphone}`}</p>
          <p className={`${styles.fw600} ${styles.textEllipsis} ${styles.opacity07}`}>
            {customerData?.attributes?.email}
          </p>
        </div>
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 10, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/customers/${customerData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {user?.role === Role.collaborator && (
              <>
                <div
                  className={`${styles.option} mt-3`}
                  onClick={() => {
                    navigate(`/app/customers/${customerData?.id}/edit`);
                  }}
                >
                  <PencilSquare />
                  <p>Editar cliente</p>
                </div>
              </>
            )}
          </Tooltip>
        </div>
      </td>
    </tr>
  );
};

export default RowCustomersTable;
