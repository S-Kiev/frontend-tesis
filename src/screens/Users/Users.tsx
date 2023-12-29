import { FC, useState } from 'react';
import styles from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getUsersData } from 'api/users';
import UsersTable from 'components/usersTable/usersTable';
import Search from 'components/search/search';
import { PersonFillSlash, SendSlash } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Users, search],
    queryFn: () => getUsersData(search),
  });

  console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headline}>Usuarios</h2>
          <p>Listado de todos los usuarios existentes en el sistema</p>
        </div>
        <Button variant="success" onClick={() => navigate('/app/users/create')} className="d-none d-lg-block">
          + Crear nuevo usuario
        </Button>
      </div>
      <Button variant="success" onClick={() => navigate('/app/users/create')} className="d-lg-none mt-3">
        + Crear nuevo usuario
      </Button>
      {data?.data.length === 0 && !isLoading && search.length === 0 ? (
        <div className={styles.errorFilters}>
          <PersonFillSlash size={80} />
          <h3 className="mt-3">Aún no existen usuarios</h3>
        </div>
      ) : (
        <>
          {!error ? (
            <div className={styles.filters}>
              <Search placeholder="Buscar por nombre de Usuario" onChange={e => setSearch(e)} width={300} />
            </div>
          ) : null}
        </>
      )}
      {/*error ? <LoadErrorModal toggleModal={toggleErrorModal} isOpen={showErrorModal} /> : null*/}
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : null}

      {!isLoading && !error && data && data?.data.length !== 0 ? (
        <UsersTable usersData={data?.data || []} />
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

export default Users;
