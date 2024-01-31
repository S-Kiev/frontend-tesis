import { FC, useState } from 'react';
import styles from './Consultations.module.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultations } from 'api/consultation';
import { Role } from 'models/Roles';
import { CloudLightningRain, DatabaseSlash, FunnelFill, SendSlash } from 'react-bootstrap-icons';
import Search from 'components/search/search';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import ConsultationsTable from 'components/consultationsTable/consultationsTable';
import { ConsultationsFilterModal } from 'components/modals/consultationsFilterModal';

interface ConsultationsProps {}

const Consultations: FC<ConsultationsProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<{ name: null | string }>({
    name: null,
  });
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Consultations, search, page, filter],
    queryFn: () => getConsultations(page, search, filter),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Consultas</h2>
          <p>Listado de todas las consultas existentes en el sistema</p>
        </div>
        {user?.role === Role.collaborator && (
          <Button variant="success" onClick={() => navigate('/app/consultations/create')} className="d-none d-lg-block">
            + Agendar nueva consulta
          </Button>
        )}
      </div>
      {user?.role === Role.collaborator && (
        <Button variant="success" onClick={() => navigate('/app/consultations/create')} className="d-lg-none mt-3">
          + Agendar nueva consulta
        </Button>
      )}
      {data?.data?.data.length === 0 && !isLoading && search.length === 0 ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen consultas</h3>
        </div>
      ) : (
        <>
          {!error ? (
            <div className={styles.filters}>
              <Search placeholder="Buscar por nombre cliente o id consulta" onChange={e => setSearch(e)} width={320} />
              <div>
                <Button
                  variant="success"
                  onClick={() => {
                    setShowFilter(true);
                  }}
                  className="d-none d-lg-block me-3"
                >
                  <FunnelFill /> Filtrar Consultas
                </Button>
              </div>
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
          {<ConsultationsTable consultationsData={data?.data?.data} />}
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
        (search.length !== 0 || filter.name !== null) && (
          <div className={styles.errorFilters}>
            <SendSlash size={80} />
            <h3 className="mt-3">No encontramos resultados</h3>
            <h5 className="mb-3 text-center">Puedes intentarlo nuevamente modificando la busqueda o filtros</h5>
          </div>
        )
      )}
      <ConsultationsFilterModal show={showFilter} showModal={setShowFilter} filter={filter} setFilter={setFilter} />
    </div>
  );
};

export default Consultations;
