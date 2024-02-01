import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomers } from 'api/customers';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Customers.module.scss';
import { Button } from 'react-bootstrap';
import { CloudLightningRain, PersonFillSlash, SendSlash } from 'react-bootstrap-icons';
import Search from 'components/search/search';
import { DotLoader } from 'react-spinners';
import CustomersTable from 'components/customersTable/customersTable';
import { Role } from 'models/Roles';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';

interface CustomersProps {}

const Customers: FC<CustomersProps> = () => {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Customers, search, page],
    queryFn: () => getCustomers(page, search),
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Clientes</h2>
          <p>Listado de todos los clientes existentes en el sistema</p>
        </div>
        {user?.role === Role.collaborator && (
          <Button variant="success" onClick={() => navigate('/app/customers/create')} className="d-none d-lg-block">
            + Crear nuevo cliente
          </Button>
        )}
      </div>
      {user?.role === Role.collaborator && (
        <Button variant="success" onClick={() => navigate('/app/customers/create')} className="d-lg-none mt-3">
          + Crear nuevo cliente
        </Button>
      )}
      {data?.data?.data.length === 0 && !isLoading && search.length === 0 ? (
        <div className={styles.errorFilters}>
          <PersonFillSlash size={80} />
          <h3 className="mt-3">Aún no existen clientes</h3>
        </div>
      ) : (
        <>
          {!error ? (
            <div className={styles.filters}>
              <Search placeholder="Buscar por nombre o apellido cliente" onChange={e => setSearch(e)} width={300} />
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
          <CustomersTable customersData={data?.data?.data} search={search} />
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

export default Customers;
