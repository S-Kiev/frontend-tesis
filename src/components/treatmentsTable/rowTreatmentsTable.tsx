import { FC, useState } from 'react';
import styles from './treatmentsTable.module.scss';
import { useNavigate } from 'react-router-dom';
import { ThreeDotsVertical, Eye, PencilSquare, Trash3, SlashCircle } from 'react-bootstrap-icons';
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
import { TreatmentsData } from 'models/Treatments';

interface RowTreatmentsTableProps {
  treatmentData: TreatmentsData;
  search: string;
}

const RowTreatmentsTable: FC<RowTreatmentsTableProps> = ({ treatmentData, search }) => {
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
    <tr key={treatmentData?.id}>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600}`}>{treatmentData?.id}</p>
      </td>
      <td className={styles.titleTd}>
        <p className={`${styles.fw600} ${styles.textEllipsis}`}>{treatmentData?.attributes?.name}</p>
      </td>
      <td>
        <div className={styles.divPopup}>
          <Tooltip
            classname={`${styles.popup}`}
            clickableChild={<ThreeDotsVertical />}
            customStyle={{ position: 'absolute', right: 100, zIndex: 1000 }}
          >
            <div className={styles.option} onClick={() => navigate(`/app/treatments/${treatmentData?.id}`)}>
              <Eye />
              <p>Ver detalle</p>
            </div>
            {user?.role === Role.collaborator && (
              <>
                <div
                  className={`${styles.option} mt-3`}
                  onClick={() => {
                    navigate(`/app/treatments/${treatmentData?.id}/edit`);
                  }}
                >
                  <PencilSquare />
                  <p>Editar tratamiento</p>
                </div>
                <div className={`${styles.optionDelete} mt-3`} onClick={() => {}}>
                  <SlashCircle color="#dc3545" />
                  <p>Desactivar tratamiento</p>
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

export default RowTreatmentsTable;
