import { useQuery } from '@tanstack/react-query';
import { getConsultationsInfoByConsultation } from 'api/consultation';
import { FC } from 'react';
import { ChevronLeft, CloudLightningRain } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import styles from './ObservationEdit.module.scss';
import { QueryKeys } from 'api/QueryKeys';
import { useGetConsultationData } from 'customHooks/useGetConsultationData';
import ObservationEditForm from 'components/ObservationEditForm/ObservationEditForm';

interface ObservationEditProps {}

const ObservationEdit: FC<ObservationEditProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data: consultationData } = useGetConsultationData(id || '');

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.ConsultationsInfoByConsultation, id],
    queryFn: () => getConsultationsInfoByConsultation(id || ''),
  });

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '300px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : (
        <>
          {error ? (
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
                    <h2 className={styles.headline}>Editar Observaciones</h2>
                    <p>Modifica las observaciones de una consulta del sistema</p>
                  </div>
                </div>
              </div>
              <div className={styles.form}>
                {
                  <ObservationEditForm
                    consultationId={id || ''}
                    customerId={consultationData?.customer?.data?.id || ''}
                    observationData={data?.data?.data[0] || []}
                  />
                }
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ObservationEdit;
