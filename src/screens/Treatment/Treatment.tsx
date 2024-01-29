import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getTreatment } from 'api/treatment';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Treatment.module.scss';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, CloudLightningRain, PencilSquare, SlashCircle } from 'react-bootstrap-icons';
import { Role } from 'models/Roles';
import { Button } from 'react-bootstrap';
import TreatmentCrad from 'components/treatmentCrad/treatmentCrad';

interface TreatmentProps {}

const Treatment: FC<TreatmentProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Treatment, id],
    queryFn: () => getTreatment(id || ''),
  });
  console.log(data);
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
                    <h2 className={styles.headline}>{data?.data?.data?.attributes?.name || '---'}</h2>
                    <p>Ver detalle del tratamiento</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/treatments/${id}/edit`)}
                        className="d-none d-lg-block"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar
                      </Button>
                      <Button variant="danger" onClick={() => {}} className="d-none d-lg-block">
                        <SlashCircle style={{ marginRight: '5px' }} />
                        Descativar tratamiento
                      </Button>
                    </>
                  ) : null}
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/treatments/${id}/edit`)}
                      className="d-lg-none mt-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                    <Button variant="danger" onClick={() => {}} className="d-lg-none mt-3">
                      <SlashCircle style={{ marginRight: '5px' }} />
                      Descativar tratamiento
                    </Button>
                  </>
                ) : null}
              </div>
              <div className={styles.form}>{<TreatmentCrad treatmentData={data?.data?.data} />}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Treatment;
