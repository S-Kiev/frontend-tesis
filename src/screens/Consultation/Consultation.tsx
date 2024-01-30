import { useGetConsultationData } from 'customHooks/useGetConsultationData';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Consultation.module.scss';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, CloudLightningRain, PencilSquare, SlashCircle } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Role } from 'models/Roles';
import ConsultationCard from 'components/consultationCard/consultationCard';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultingRoomsHistoryByConsultation } from 'api/consultingRoom';
import { ConsultationStatusEnum } from 'models/ConsultationStatus';
import { getConsultationsInfoByConsultation } from 'api/consultation';
import { getCustomersPayments, getCustomersPaymentsByConsultation } from 'api/customers';

interface ConsultationProps {}

const Consultation: FC<ConsultationProps> = () => {
  const [showModalCancel, setShowModalCancel] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const { data, isLoading, error } = useGetConsultationData(id || '');

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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Consultation;
