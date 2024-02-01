import { FC, useState } from 'react';
import styles from './customersTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical, Eye, PencilSquare, Trash3 } from 'react-bootstrap-icons';
import Tooltip from 'components/Popup/tooltip';
import { Role } from 'models/Roles';
import { AlertModal } from 'components/modals/alertModal';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';
import { CustomerData } from 'models/Customer';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';

interface RowCustomersTableProps {
  customerData: CustomerData;
  search: string;
}

const RowCustomersTable: FC<RowCustomersTableProps> = ({ customerData, search }) => {
  //const [showBlockedModal, setShowBlockedModal] = useState(false);
  //const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  //const queryClient = useQueryClient();

  /*const blockedUserMutation = useMutation({
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
  });*/

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
                <div className={`${styles.optionDelete} mt-3`} onClick={() => {}}>
                  <Trash3 color="#dc3545" />
                  <p>Eliminar cliente</p>
                </div>
              </>
            )}
          </Tooltip>
        </div>
      </td>
      {/*<AlertModal
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
    />*/}
    </tr>
  );
};

export default RowCustomersTable;
