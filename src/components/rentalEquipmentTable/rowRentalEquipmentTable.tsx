import { FC, useState } from 'react';
import styles from './rentalEquipmentTable.module.scss';
import { format } from 'date-fns';
import { EquipmentHistoryDataRental } from 'models/equipmentHistory';
import { Button } from 'react-bootstrap';
import { SlashCircle } from 'react-bootstrap-icons';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { Role } from 'models/Roles';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cancelRentalEquipmentHistory } from 'api/equipment';
import { QueryKeys } from 'api/QueryKeys';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';
import { AlertModal } from 'components/modals/alertModal';

interface RowRentalEquipmentTableProps {
  data: EquipmentHistoryDataRental;
}

const RowRentalEquipmentTable: FC<RowRentalEquipmentTableProps> = ({ data }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const user = useSelector(selectUser);
  const queryClient = useQueryClient();

  const cancelRentalEquipment = useMutation({
    mutationFn: cancelRentalEquipmentHistory,
    mutationKey: [QueryKeys.CancelRentalEquipment, data?.id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.PendingRentedEquipment],
      });
      toast(<SuccessToast message={`Alquiler cancelado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al intentar cancelar el alquiler, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  return (
    <tr key={data?.id}>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
            data?.attributes?.since ? format(new Date(data?.attributes?.since), 'dd-MM-yyyy H:mm') : '---'
          }hs`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        <div className="d-flex flex-column gap-2">
          <p className={`${styles.fw600} ${styles.textEllipsis}`}>{`${
            data?.attributes?.until ? format(new Date(data?.attributes?.until), 'dd-MM-yyyy H:mm') : '---'
          }hs`}</p>
        </div>
      </td>
      <td className={styles.titleTd}>
        {user?.role === Role.collaborator && (
          <Button
            variant="danger"
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <SlashCircle className="me-2" size={20} />
            Cancelar Alquiler
          </Button>
        )}
      </td>
      <AlertModal
        show={showModal}
        showModal={setShowModal}
        title="Cancelar alquiler"
        body={
          <>
            ¿Está seguro que quiere <strong>cancelar</strong> este alquiler?
          </>
        }
        confirmBtn="Cancelar alquiler"
        cancelBtn="Volver"
        onAction={() => cancelRentalEquipment.mutate(data?.id)}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
    </tr>
  );
};

export default RowRentalEquipmentTable;
