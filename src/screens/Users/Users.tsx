import { FC } from 'react';
import styles from './Users.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

interface UsersProps {}

const Users: FC<UsersProps> = () => {
  const navigate = useNavigate();

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

      {/*data?.data.length === 0 && !loading && !filterActive ? (
  <div className={styles.errorFilters}>
    <img src={ProfileIcon} alt="Usuarios" />
    <h3 className="mt-3">Aún no existen usuarios</h3>
  </div>
) : (
  <div>
    {!error ? (
      <div>
        <div className={styles.filters}>
          <div className={styles.inputs}>
            <CustomInputFilter
              setter={setSearch}
              value={search}
              placeHolder="Buscar por nombre, email o ID"
            />
          </div>
        </div>
      </div>
    ) : null*/}
      {/*error ? <LoadErrorModal toggleModal={toggleErrorModal} isOpen={showErrorModal} /> : null*/}
      {/*loading ? <Loader /> : null*/}

      {/*!loading && !error && data && data?.data.length !== 0 ? (
      <UsersTable usersRequests={data?.data} />
    ) : (
      !error &&
      !loading &&
      filterActive && (
        <div className={styles.errorFilters}>
          <img src={SearchIcon} alt="lupas" />
          <h3 className="mt-3">No encontramos resultados</h3>
          <p className="mb-3">Puedes intentarlo nuevamente modificando los filtros seleccionados</p>
        </div>
      )
      )*/}
    </div>
  );
};

export default Users;
