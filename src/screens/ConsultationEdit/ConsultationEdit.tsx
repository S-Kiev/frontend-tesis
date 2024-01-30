import { useGetConsultationData } from 'customHooks/useGetConsultationData';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import styles from './ConsultationEdit.module.scss';
import { ChevronLeft, CloudLightningRain } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { QueryKeys } from 'api/QueryKeys';
import { useQuery } from '@tanstack/react-query';
import { getUserData } from 'api/users';
import ConsultationEditForm from 'components/consultationEditForm/consultationEditForm';
import { parseTreatments } from 'util/parseTreatments';

interface ConsultationEditProps {}

const ConsultationEdit: FC<ConsultationEditProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetConsultationData(id || '');
  const user = useSelector(selectUser);
  const treatmentsArray = data ? parseTreatments(data?.treatments?.data || []) : null;

  const { data: userData } = useQuery({
    queryKey: [QueryKeys.UserDataPorfile, user?.id],
    queryFn: () => getUserData(user?.id.toString() || ''),
  });

  return (
    <div className={styles.container}>
      {isLoading && userData ? (
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
                    <h2 className={styles.headline}>Editar consulta</h2>
                    <p>Modifica una consulta registrada en el sistema</p>
                  </div>
                </div>
              </div>
              <div className={styles.form}>
                {data && userData && treatmentsArray && (
                  <ConsultationEditForm
                    userDataId={userData?.data?.data[0]?.id}
                    consultationData={data}
                    traetmentsArray={treatmentsArray}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultationEdit;
