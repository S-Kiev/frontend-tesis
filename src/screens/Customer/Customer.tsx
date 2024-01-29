import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomerInfo } from 'api/customers';
import { FC } from 'react';
import { ChevronLeft, ClockHistory, CloudLightningRain, PencilSquare, PersonFillDown } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import styles from './Customer.module.scss';
import { Button } from 'react-bootstrap';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { Role } from 'models/Roles';

interface CustomerProps {}

const Customer: FC<CustomerProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Customer, id],
    queryFn: () => getCustomerInfo(id || ''),
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
                    <h2 className={styles.headline}>{`${data?.data?.data?.attributes?.name || '---'} ${
                      data?.data?.data?.attributes?.lastname || '---'
                    }`}</h2>
                    <p>{`Documento: ${data?.data?.data?.attributes?.document || '---'}`}</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator ? (
                    <Button variant="success" onClick={() => {}} className="d-none d-lg-block">
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                  ) : null}
                  <Button variant="success" onClick={() => {}} className="d-none d-lg-block">
                    <ClockHistory style={{ marginRight: '5px' }} />
                    Ver Historial Consultas
                  </Button>
                  <Button variant="success" onClick={() => {}} className="d-none d-lg-block">
                    <PersonFillDown style={{ marginRight: '5px' }} />
                    Descargar Ficha
                  </Button>
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator ? (
                  <Button variant="success" onClick={() => {}} className="d-lg-none mt-3">
                    <PencilSquare style={{ marginRight: '5px' }} />
                    Editar
                  </Button>
                ) : null}
                <Button variant="success" onClick={() => {}} className="d-lg-none mt-3">
                  <ClockHistory style={{ marginRight: '5px' }} />
                  Ver Historial Consultas
                </Button>
                <Button variant="success" onClick={() => {}} className="d-lg-none mt-3">
                  <PersonFillDown style={{ marginRight: '5px' }} />
                  Descargar Ficha
                </Button>
              </div>
              <div className={styles.form}>
                {/*data?.data?.data && <CustomerCreateForm edit customerEditData={data?.data?.data} />*/}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Customer;
