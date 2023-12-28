import { FC, useState } from 'react';
import styles from './usersTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { roleNameMapper } from 'util/roleNameMapper';
import UserStatus from 'components/userStatus/userStatus';

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
        {/*<div className={styles.divPopup}>
          <Tooltip
            classname={${styles.popup}}
            clickableChild={<img src={Kebab} alt="opciones de usuarios" />}
            customStyle={{ position: 'absolute', right: 10, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(/users/${userRequest.domainUserId})}>
              <img src={EyeIcon} alt="Ver detalle icono" />
              <p>Ver detalle</p>
            </div>
            {role !== Role.Super_Admin &&
            role !== Role.Ifi &&
            role !== Role.AFD &&
            userRequest.statusId !== UserStatusEnum.Baja ? (
              <div
                className={${styles.option} my-3}
                onClick={() => navigate(/users/${userRequest.domainUserId}/edituser)}
              >
                <img src={EditIcon} alt="Editar icono" />
                <p>Editar</p>
              </div>
            ) : null}
            {userRequest.statusId !== UserStatusEnum.Baja ? (
              <>
                <div className={${styles.option} my-3} onClick={() => setDisableModal(true)}>
                  <img src={CloseIcon} alt="Inhabilitar icono" />
                  <p>Inhabilitar</p>
                </div>
                <div className={styles.option} onClick={() => openRemovalModal()}>
                  <img src={TrashIcon} alt="Eliminar icono" />
                  <p>Eliminar</p>
                </div>
              </>
            ) : null}
          </Tooltip>
            </div>*/}
      </td>
      {/*<UserDisableModal isOpen={disableModal} toggleModal={toggleDisableModal} id={userRequest.domainUserId} />*/}
    </tr>
  );
};

export default RowUsersTable;
