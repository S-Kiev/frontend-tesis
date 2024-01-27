import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomerInfo } from 'api/customers';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerEdit.module.scss';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, CloudLightningRain } from 'react-bootstrap-icons';
import CustomerCreateForm from 'components/customerCreateForm/customerCreateForm';

interface CustomerEditProps {}

const CustomerEdit: FC<CustomerEditProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CustomerInfo, id],
    queryFn: () => getCustomerInfo(id || ''),
  });

  console.log(data?.data?.data);

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
                    <h2 className={styles.headline}>Editar cliente</h2>
                    <p>Modifica un cliente del sistema</p>
                  </div>
                </div>
              </div>
              <div className={styles.form}>
                {data?.data?.data && <CustomerCreateForm edit customerEditData={data?.data?.data} />}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerEdit;
