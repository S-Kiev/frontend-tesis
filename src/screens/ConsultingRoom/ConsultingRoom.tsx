import { QueryKeys } from 'api/QueryKeys';
import { getConsultingRoom } from 'api/consultingRoom';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './ConsultingRoom.module.scss';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, ClipboardCheck, ClockHistory, CloudLightningRain, PencilSquare } from 'react-bootstrap-icons';
import { Role } from 'models/Roles';
import { Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import ConsultingRoomCard from 'components/consultingRoomCard/consultingRoomCard';
import { ChangeStatusConsultingRoomModal } from 'components/modals/changeStatusCosnultingRoomModal';

interface ConsultingRoomProps {}

const ConsultingRoom: FC<ConsultingRoomProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.ConsultingRoom, id],
    queryFn: () => getConsultingRoom(id || ''),
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
                    <p>Ver detalle del consultorio</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.superAdmin ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/consultingsRooms/${id}/edit`)}
                        className="d-none d-lg-block"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          setShowModal(true);
                        }}
                        className="d-none d-lg-block"
                      >
                        <ClipboardCheck style={{ marginRight: '5px' }} />
                        Cambiar estado
                      </Button>
                    </>
                  ) : null}
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/consultingsRooms/${id}/history`)}
                    className="d-none d-lg-block"
                  >
                    <ClockHistory style={{ marginRight: '5px' }} />
                    Ver Historial Consultorio
                  </Button>
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.superAdmin ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/consultingsRooms/${id}/edit`)}
                      className="d-lg-none mt-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowModal(true);
                      }}
                      className="d-lg-none mt-3"
                    >
                      <ClipboardCheck style={{ marginRight: '5px' }} />
                      Cambiar estado
                    </Button>
                  </>
                ) : null}
                <Button
                  variant="success"
                  onClick={() => navigate(`/app/consultingsRooms/${id}/history`)}
                  className="d-lg-none mt-3"
                >
                  <ClockHistory style={{ marginRight: '5px' }} />
                  Ver Historial Consultorio
                </Button>
              </div>
              <div className={styles.form}>{<ConsultingRoomCard consultingRoomData={data?.data?.data} />}</div>
              <ChangeStatusConsultingRoomModal
                show={showModal}
                showModal={setShowModal}
                consultingRoomData={data?.data?.data}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultingRoom;
