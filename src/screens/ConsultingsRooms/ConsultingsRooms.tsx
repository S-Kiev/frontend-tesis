import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './ConsultingsRooms.module.scss';
import { Button } from 'react-bootstrap';
import { Role } from 'models/Roles';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultingsRooms } from 'api/consultingRoom';
import { BuildingFillSlash, CloudLightningRain } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import { defaultPageSize } from 'api/paginationConfig';
import PaginationComponent from 'components/pagination/pagination';
import ConsultingRoomTable from 'components/consultingRoomTable/consultingRoomTable';

interface ConsultingsRoomsProps {}

const ConsultingsRooms: FC<ConsultingsRoomsProps> = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.ConsultingsRooms, page],
    queryFn: () => getConsultingsRooms(page),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Consultorios</h2>
          <p>Listado de todos los consultorios existentes en el sistema</p>
        </div>
        {user?.role === Role.superAdmin && (
          <Button
            variant="success"
            onClick={() => navigate('/app/consultingsRooms/create')}
            className="d-none d-lg-block"
          >
            + Crear nuevo consultorio
          </Button>
        )}
      </div>
      {user?.role === Role.superAdmin && (
        <Button variant="success" onClick={() => navigate('/app/consultingsRooms/create')} className="d-lg-none mt-3">
          + Crear nuevo consultorio
        </Button>
      )}
      {data?.data?.data.length === 0 && !isLoading && (
        <div className={styles.errorFilters}>
          <BuildingFillSlash size={80} />
          <h3 className="mt-3">Aún no existen consultorios</h3>
        </div>
      )}
      {error ? (
        <div className={styles.errorFilters}>
          <CloudLightningRain size={80} />
          <h3 className="mt-3">Ups, ha ocurrido un error</h3>
          <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
        </div>
      ) : null}
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : null}
      {!isLoading && !error && data && data?.data?.data.length !== 0 && (
        <>
          <ConsultingRoomTable consultingsRoomsData={data?.data?.data} />
          {data?.data?.meta?.pagination?.total > defaultPageSize && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                data={data?.data?.meta?.pagination}
                changePage={(e: any) => {
                  setPage(e.page);
                }}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ConsultingsRooms;
