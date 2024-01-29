import { FC } from 'react';
import styles from './Equipment.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getEquipment } from 'api/equipment';
import { QueryKeys } from 'api/QueryKeys';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, ClipboardCheck, ClockHistory, CloudLightningRain, PencilSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { Role } from 'models/Roles';

interface EquipmentProps {}

const Equipment: FC<EquipmentProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Equipment, id],
    queryFn: () => getEquipment(id || ''),
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
                    <h2 className={styles.headline}>{data?.data?.data?.attributes?.name || '---'}</h2>
                    <p>Ver detalle del equipo</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator ? (
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/equipments/${id}/edit`)}
                      className="d-none d-lg-block"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                  ) : null}
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/equipments/${id}/history`)}
                    className="d-none d-lg-block"
                  >
                    <ClockHistory style={{ marginRight: '5px' }} />
                    Ver Historial Equipo
                  </Button>
                  <Button variant="success" onClick={() => {}} className="d-none d-lg-block">
                    <ClipboardCheck style={{ marginRight: '5px' }} />
                    Cambiar estado
                  </Button>
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator ? (
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/equipments/${id}/edit`)}
                    className="d-lg-none mt-3"
                  >
                    <PencilSquare style={{ marginRight: '5px' }} />
                    Editar
                  </Button>
                ) : null}
                <Button
                  variant="success"
                  onClick={() => navigate(`/app/equipments/${id}/history`)}
                  className="d-lg-none mt-3"
                >
                  <ClockHistory style={{ marginRight: '5px' }} />
                  Ver Historial Equipo
                </Button>
                <Button variant="success" onClick={() => {}} className="d-lg-none mt-3">
                  <ClipboardCheck style={{ marginRight: '5px' }} />
                  Cambiar estado
                </Button>
              </div>
              <div className={styles.form}>{/*<CustomerInfo customerData={data?.data?.data} />*/}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Equipment;
