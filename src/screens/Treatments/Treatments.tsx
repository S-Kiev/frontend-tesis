import { Role } from 'models/Roles';
import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Treatments.module.scss';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getTreatments } from 'api/treatment';
import Search from 'components/search/search';
import { CloudLightningRain, DatabaseSlash, SendSlash } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import TreatmentsTable from 'components/treatmentsTable/treatmentsTable';

interface TreatmentsProps {}

const Treatments: FC<TreatmentsProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Treatments, search, page],
    queryFn: () => getTreatments(page, search),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Tratamientos</h2>
          <p>Listado de todos los tratamientos existentes en el sistema</p>
        </div>
        {user?.role === Role.collaborator && (
          <Button variant="success" onClick={() => navigate('/app/treatments/create')} className="d-none d-lg-block">
            + Crear nuevo tratamiento
          </Button>
        )}
      </div>
      {user?.role === Role.collaborator && (
        <Button variant="success" onClick={() => navigate('/app/treatments/create')} className="d-lg-none mt-3">
          + Crear nuevo tratamiento
        </Button>
      )}
      {data?.data?.data.length === 0 && !isLoading && search.length === 0 ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen tratamientos</h3>
        </div>
      ) : (
        <>
          {!error ? (
            <div className={styles.filters}>
              <Search placeholder="Buscar por nombre o id tratamiento" onChange={e => setSearch(e)} width={300} />
            </div>
          ) : null}
        </>
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
      {!isLoading && !error && data && data?.data?.data.length !== 0 ? (
        <>
          <TreatmentsTable treatmentsData={data?.data?.data} search={search} page={page} />
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
      ) : (
        !error &&
        !isLoading &&
        search.length !== 0 && (
          <div className={styles.errorFilters}>
            <SendSlash size={80} />
            <h3 className="mt-3">No encontramos resultados</h3>
            <h5 className="mb-3 text-center">Puedes intentarlo nuevamente modificando la busqueda</h5>
          </div>
        )
      )}
    </div>
  );
};

export default Treatments;
