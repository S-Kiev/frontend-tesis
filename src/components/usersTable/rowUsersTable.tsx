import { FC, useState } from 'react';
import styles from './usersTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { roleNameMapper } from 'util/roleNameMapper';
import UserStatus from 'components/userStatus/userStatus';
import { ThreeDotsVertical, Eye, KeyFill } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { AlertModal } from 'components/modals/alertModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { changeStateUser } from 'api/users';
import { QueryKeys } from 'api/QueryKeys';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';

interface RowUsersTableProps {
  userData: any;
  search: string;
}

const RowUsersTable: FC<RowUsersTableProps> = ({ userData, search }) => {
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const blockedUserMutation = useMutation({
    mutationFn: changeStateUser,
    mutationKey: [QueryKeys.PutUser, userData?.id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Users, search],
      });
      toast(<SuccessToast message={`Usuario ${userData?.blocked ? 'habilitado' : 'bloqueado'} con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowBlockedModal(false);
    },
    onError: () => {
      toast(
        <ErrorToast message={`Ha ocurrido un error al ${userData?.blocked ? 'habilitar' : 'bloquear'} el usuario`} />,
        {
          style: { borderRadius: '10px' },
        },
      );
      setIsDisabled(false);
    },
  });

  return (
    <tr key={userData?.id}>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{userData?.username}</p>
          <p className={`mt-2${styles.opacity07} ${styles.textEllipsis}`}>{userData?.email}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{roleNameMapper(userData?.role?.name)}</p>
      </td>
      <td className={styles.titleTd}>
        <UserStatus status={!userData?.blocked} />
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
            customStyle={{ position: 'absolute', right: 25, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/user/${userData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {userData?.role?.name === Role.collaborator && (
              <div
                className={`${styles.option} mt-3`}
                onClick={() => {
                  setShowBlockedModal(true);
                }}
              >
                <KeyFill />
                <p>Cambiar estado</p>
              </div>
            )}
          </Tooltip>
        </div>
      </td>
      <AlertModal
        show={showBlockedModal}
        showModal={setShowBlockedModal}
        title={userData?.blocked ? 'Habilitar usuario' : 'Bloquear usuario'}
        body={
          <>
            ¿Está seguro que quiere <strong>{`${userData?.blocked ? 'habilitar' : 'bloquear'}`}</strong> este usuario?
          </>
        }
        confirmBtn="Aceptar"
        cancelBtn="Cancelar"
        onAction={() => blockedUserMutation.mutate({ userId: userData?.id || '', blocked: !userData?.blocked })}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
    </tr>
  );
};

export default RowUsersTable;
