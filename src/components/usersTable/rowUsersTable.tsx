import { FC, useState } from 'react';
import styles from './usersTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { roleNameMapper } from 'util/roleNameMapper';
import UserStatus from 'components/userStatus/userStatus';
import { ThreeDotsVertical, Eye, KeyFill } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import Tooltip from 'components/Popup/tooltip';

interface RowUsersTableProps {
  userData: any;
}

const RowUsersTable: FC<RowUsersTableProps> = ({ userData }) => {
  const [disableModal, setDisableModal] = useState<boolean>(false);
  const [disableStatus, setDisableStatus] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleDisableModal = (success: boolean) => {
    setDisableModal(!disableModal);
    if (success) setDisableStatus(true);
  };

  return (
    <tr key={userData.id}>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{userData.username}</p>
          <p className={`mt-2${styles.opacity07} ${styles.textEllipsis}`}>{userData.email}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{roleNameMapper(userData.role.name)}</p>
      </td>
      <td className={styles.titleTd}>
        <UserStatus status={!userData.blocked} />
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.date}`}>
          {userData?.createdAt ? format(new Date(userData.createdAt), 'dd-MM-yyyy H:mm') : '---'}
        </p>
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 10, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/user/${userData.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            <div className={`${styles.option} mt-3`} onClick={() => {}}>
              <KeyFill />
              <p>Cambiar estado</p>
            </div>
          </Tooltip>
        </div>
      </td>
      {/*<UserDisableModal isOpen={disableModal} toggleModal={toggleDisableModal} id={userRequest.domainUserId} />*/}
    </tr>
  );
};

export default RowUsersTable;
