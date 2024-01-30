import { useGetConsultationData } from 'customHooks/useGetConsultationData';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Consultation.module.scss';
import { DotLoader } from 'react-spinners';
import {
  ChevronLeft,
  CloudLightningRain,
  JournalCheck,
  Journals,
  PencilSquare,
  SlashCircle,
} from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Role } from 'models/Roles';
import ConsultationCard from 'components/consultationCard/consultationCard';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultingRoomsHistoryByConsultation } from 'api/consultingRoom';
import { ConsultationStatusEnum } from 'models/ConsultationStatus';
import { cancelConsultation, getConsultationsInfoByConsultation } from 'api/consultation';
import { getCustomersPaymentsByConsultation } from 'api/customers';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';
import { AlertModal } from 'components/modals/alertModal';

interface ConsultationProps {}

const Consultation: FC<ConsultationProps> = () => {
  const [showModalCancel, setShowModalCancel] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { data, isLoading, error } = useGetConsultationData(id || '');
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const {
    data: historyConsultingRoomData,
    error: historyConsultingRoomError,
    isLoading: historyConsultingRoomIsLoading,
  } = useQuery({
    queryKey: [QueryKeys.ConsultingRoomsHistoryByConsultation, id],
    queryFn: () => getConsultingRoomsHistoryByConsultation(id || ''),
  });

  const {
    data: consultationInfoData,
    error: consultationInfoError,
    isLoading: consultationInfoIsLoading,
  } = useQuery({
    queryKey: [QueryKeys.ConsultationsInfoByConsultation, id],
    queryFn: () => getConsultationsInfoByConsultation(id || ''),
  });

  const {
    data: dataPayments,
    error: errorPayments,
    isLoading: isLoadingPayments,
  } = useQuery({
    queryKey: [QueryKeys.CustomersPaymentsByConsultation, id],
    queryFn: () => getCustomersPaymentsByConsultation(id || ''),
  });

  const cancelConsultationMutation = useMutation({
    mutationFn: cancelConsultation,
    mutationKey: [QueryKeys.CancelConsultation, id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Cosnultation, id],
      });
      toast(<SuccessToast message={`Consulta cancelada con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowModalCancel(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al cancelar la consulta, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  return (
    <div className={styles.container}>
      {isLoading && historyConsultingRoomIsLoading && isLoadingPayments && consultationInfoIsLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '300px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : (
        <>
          {error || historyConsultingRoomError || consultationInfoError || errorPayments ? (
            <div className={styles.error}>
              <CloudLightningRain size={80} />
              <h3 className="mt-3">Ups, ha ocurrido un error</h3>
              <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <div className="d-flex align-items-center">
                  <ChevronLeft
                    size={35}
                    className={styles.pointer}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                  <div className={styles.titleConteiner}>
                    <h2 className={styles.headline}>Ver detalle de consulta</h2>
                    <p>Visualice los detalles de una consulta registrada en el sistema</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator && data?.status === ConsultationStatusEnum.pending ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/consultations/${id}/edit`)}
                        className="d-none d-lg-block"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => {
                          setShowModalCancel(true);
                        }}
                        className="d-none d-lg-block"
                      >
                        <SlashCircle style={{ marginRight: '5px' }} />
                        Cancelar consulta
                      </Button>
                    </>
                  ) : null}
                  {user?.role === Role.collaborator &&
                  (data?.status === ConsultationStatusEnum.inProgress ||
                    data?.status === ConsultationStatusEnum.finish) ? (
                    <>
                      {consultationInfoData?.data?.data?.length >= 1 ? (
                        <Button
                          variant="success"
                          onClick={() =>
                            navigate(
                              `/app/consultations/${id}/observation/${consultationInfoData?.data?.data[0]?.id}/edit`,
                            )
                          }
                          className="d-none d-lg-block"
                        >
                          <JournalCheck style={{ marginRight: '5px' }} />
                          Editar Observaciones
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => navigate(`/app/consultations/${id}/observation/create`)}
                          className="d-none d-lg-block"
                        >
                          <Journals style={{ marginRight: '5px' }} />
                          Agregar Observaciones
                        </Button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator && data?.status === ConsultationStatusEnum.pending ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/consultations/${id}/edit`)}
                      className="d-lg-none mt-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowModalCancel(true);
                      }}
                      className="d-lg-none mt-3"
                    >
                      <SlashCircle style={{ marginRight: '5px' }} />
                      Cancelar consulta
                    </Button>
                  </>
                ) : null}
                {user?.role === Role.collaborator &&
                (data?.status === ConsultationStatusEnum.inProgress ||
                  data?.status === ConsultationStatusEnum.finish) ? (
                  <>
                    {consultationInfoData?.data?.data?.length >= 1 ? (
                      <Button
                        variant="success"
                        onClick={() =>
                          navigate(
                            `/app/consultations/${id}/observation/${consultationInfoData?.data?.data[0]?.id}/edit`,
                          )
                        }
                        className="d-lg-none mt-3"
                      >
                        <JournalCheck style={{ marginRight: '5px' }} />
                        Editar Observaciones
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/consultations/${id}/observation/create`)}
                        className="d-lg-none mt-3"
                      >
                        <Journals style={{ marginRight: '5px' }} />
                        Agregar Observaciones
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
              <div className={styles.form}>
                {
                  <>
                    <ConsultationCard
                      data={data}
                      dataConsultingRooms={historyConsultingRoomData?.data?.data}
                      observations={consultationInfoData?.data?.data[0] || []}
                      paymentData={dataPayments?.data?.data[0] || []}
                    />
                  </>
                }
              </div>
              {
                <AlertModal
                  show={showModalCancel}
                  showModal={setShowModalCancel}
                  title={'Cancelar consulta'}
                  body={
                    <>
                      ¿Está seguro que quiere <strong>cancelar</strong> esta consulta?
                    </>
                  }
                  confirmBtn="Confirmar"
                  cancelBtn="Cancelar"
                  onAction={() => cancelConsultationMutation.mutate(id || '')}
                  isDisabled={isDisabled}
                  setIsDisabled={setIsDisabled}
                />
              }
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Consultation;
