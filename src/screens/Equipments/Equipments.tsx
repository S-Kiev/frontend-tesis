import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Equipments.module.scss';
import { Role } from 'models/Roles';
import { QueryKeys } from 'api/QueryKeys';
import { useQuery } from '@tanstack/react-query';
import { getEquipments } from 'api/equipment';
import { CloudLightningRain, DatabaseSlash, FunnelFill, SendSlash } from 'react-bootstrap-icons';
import Search from 'components/search/search';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import EquipmentsTable from 'components/equipmentsTable/equipmentsTable';
import { EquipmentsFilterModal } from 'components/modals/equipmentsFilterModal';

interface EquipmentsProps {}

const Equipments: FC<EquipmentsProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filter, setFilter] = useState<{ name: null | string }>({
    name: null,
  });
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Equipments, search, page, filter],
    queryFn: () => getEquipments(page, search, filter),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Equipos</h2>
          <p>Listado de todos los equipos existentes en el sistema</p>
        </div>
        {user?.role === Role.collaborator && (
          <Button variant="success" onClick={() => navigate('/app/equipments/create')} className="d-none d-lg-block">
            + Crear nuevo equipo
          </Button>
        )}
      </div>
      {user?.role === Role.collaborator && (
        <Button variant="success" onClick={() => navigate('/app/equipments/create')} className="d-lg-none mt-3">
          + Crear nuevo equipo
        </Button>
      )}
      {data?.data?.data.length === 0 && !isLoading && search.length === 0 ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen equipos</h3>
        </div>
      ) : (
        <>
          {!error ? (
            <div className={styles.filters}>
              <Search placeholder="Buscar por nombre o id equipo" onChange={e => setSearch(e)} width={300} />
              <div>
                <Button
                  variant="success"
                  onClick={() => {
                    setShowFilter(true);
                  }}
                  className="d-none d-lg-block me-3"
                >
                  <FunnelFill /> Filtrar Equipos
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
          <EquipmentsTable equipmentData={data?.data?.data} search={search} />
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
      <>
        <EquipmentsFilterModal show={showFilter} showModal={setShowFilter} filter={filter} setFilter={setFilter} />
      </>
    </div>
  );
};

export default Equipments;
