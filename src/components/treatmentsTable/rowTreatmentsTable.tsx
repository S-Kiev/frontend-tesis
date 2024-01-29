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
import { desactivateTreatment } from 'api/treatment';

interface RowTreatmentsTableProps {
  treatmentData: TreatmentsData;
  search: string;
  page: number;
}

const RowTreatmentsTable: FC<RowTreatmentsTableProps> = ({ treatmentData, search, page }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const queryClient = useQueryClient();

  const desactivationTratementMutation = useMutation({
    mutationFn: desactivateTreatment,
    mutationKey: [QueryKeys.DesactivateTreatment, treatmentData?.id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Treatments, search, page],
      });
      toast(<SuccessToast message={`Tratamiento desactivado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al desactivar el tratamiento, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

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
                <div
                  className={`${styles.optionDelete} mt-3`}
                  onClick={() => {
                    setShowModal(true);
                  }}
                >
                  <SlashCircle color="#dc3545" />
                  <p>Desactivar tratamiento</p>
                </div>
              </>
            )}
          </Tooltip>
        </div>
      </td>
      <AlertModal
        show={showModal}
        showModal={setShowModal}
        title={'Desactivar tratamiento'}
        body={
          <>
            ¿Está seguro que quiere <strong>desactivar</strong> este tratamiento?
          </>
        }
        confirmBtn="Desactivar"
        cancelBtn="Cancelar"
        onAction={() => desactivationTratementMutation.mutate(treatmentData?.id)}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
    </tr>
  );
};

export default RowTreatmentsTable;
