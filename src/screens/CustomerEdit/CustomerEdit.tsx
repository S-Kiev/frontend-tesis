import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomerInfo } from 'api/customers';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface CustomerEditProps {}

const CustomerEdit: FC<CustomerEditProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CustomerInfo, id],
    queryFn: () => getCustomerInfo(id || ''),
  });

  console.log(data);

  return <></>;

  {
    /*<div className={styles.container}>
      {isLoading && isLoadingUserData ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '300px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : (
        <>
          {error || errorUserData ? (
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
                    <h2 className={styles.headline}>Editar mi usuario</h2>
                    <p>Modifica tu usuario de la aplicacion de Energía Natural</p>
                  </div>
                </div>
              </div>
              <div className={styles.form}>
                {userData?.data && data?.data?.data[0]?.attributes && (
                  <UserEditForm user={userData?.data} userData={data?.data?.data[0]?.attributes} userId={id || ''} />
                )}
              </div>
            </>
          )}
        </>
      )}
                </div>*/
  }
};

export default CustomerEdit;
