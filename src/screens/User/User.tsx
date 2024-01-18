import { FC } from 'react';
import { Button } from 'react-bootstrap';
import styles from './User.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getUser, getUserData } from 'api/users';
import { Role } from 'models/Roles';
import { CloudLightningRain, KeyFill, PencilSquare } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import UserDataCard from 'components/userDataCard/userDataCard';

interface UserProps {}

const User: FC<UserProps> = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();

  const {
    data: userData,
    error: errorUserData,
    isLoading: isLoadingUserData,
  } = useQuery({
    queryKey: [QueryKeys.UserDataPorfile, id],
    queryFn: () => getUserData(id || ''),
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.User, id],
    queryFn: () => getUser(id || ''),
  });

  return (
    <div className={styles.container}>
      {isLoading || isLoadingUserData ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : (
        <>
          {error || errorUserData ? (
            <div className={styles.errorFilters}>
              <CloudLightningRain size={80} />
              <h3 className="mt-3">Ups, ha ocurrido un error</h3>
              <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <div>
                  <h2 className={styles.headline}>
                    {`${userData ? userData?.data?.data[0]?.attributes?.name : '---'} ${
                      userData ? userData?.data?.data[0]?.attributes?.lastname : '---'
                    }`}
                  </h2>
                  <p>{data?.data?.email || '---'}</p>
                </div>
                {user?.role === Role.superAdmin ? (
                  <>
                    {data?.data?.role.name === Role.collaborator && (
                      <Button variant="success" onClick={() => {}} className="d-none d-lg-block">
                        <KeyFill style={{ marginRight: '5px' }} />
                        Cambiar estado
                      </Button>
                    )}
                    {user.id === data?.data?.id && (
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/user/${id}/config`)}
                        className="d-none d-lg-block"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar usuario
                      </Button>
                    )}
                  </>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/user/${id}/config`)}
                    className="d-none d-lg-block"
                  >
                    <PencilSquare style={{ marginRight: '5px' }} />
                    Editar usuario
                  </Button>
                )}
              </div>
              {user?.role === Role.superAdmin ? (
                <>
                  {data?.data?.role.name === Role.collaborator && (
                    <Button variant="success" onClick={() => {}} className="d-lg-none mt-3">
                      <KeyFill style={{ marginRight: '5px' }} />
                      Cambiar estado
                    </Button>
                  )}
                  {user.id === data?.data?.id && (
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/user/${id}/config`)}
                      className="d-lg-none mt-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar usuario
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="success" onClick={() => navigate(`/app/user/${id}/config`)} className="d-lg-none mt-3">
                  <PencilSquare style={{ marginRight: '5px' }} />
                  Editar usuario
                </Button>
              )}
              <div className={`d-flex align-items-center ${styles.card} flex-column flex-lg-row`}>
                <div className={styles.cardUser}>
                  <UserDataCard type="user" data={userData?.data?.data[0]?.attributes} />
                </div>
                <div className={styles.cardAccount}>
                  <UserDataCard type="account" data={data?.data} />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default User;
