import { FC, useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from './User.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { changeStateUser, getUser, getUserData } from 'api/users';
import { Role } from 'models/Roles';
import { CloudLightningRain, KeyFill, PencilSquare, ChevronLeft, Key } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import UserDataCard from 'components/userDataCard/userDataCard';
import { AlertModal } from 'components/modals/alertModal';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';
import { ChangePasswordModal } from 'components/modals/changePasswordModal';

interface UserProps {}

const User: FC<UserProps> = () => {
  const [showBlockedModal, setShowBlockedModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();
  const queryClient = useQueryClient();

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

  const blockedUserMutation = useMutation({
    mutationFn: changeStateUser,
    mutationKey: [QueryKeys.PutUser, id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.User, id],
      });
      toast(<SuccessToast message={`Usuario ${data?.data?.blocked ? 'habilitado' : 'bloqueado'} con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowBlockedModal(false);
    },
    onError: () => {
      toast(
        <ErrorToast message={`Ha ocurrido un error al ${data?.data?.blocked ? 'habilitar' : 'bloquear'} el usuario`} />,
        {
          style: { borderRadius: '10px' },
        },
      );
      setIsDisabled(false);
    },
  });

  return (
    <div className={styles.container}>
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
                <div className="d-flex align-items-center justify-content-center">
                  <ChevronLeft
                    size={35}
                    className={styles.pointer}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                  <div className={styles.titleConteiner}>
                    <h2 className={styles.headline}>
                      {`${userData ? userData?.data?.data[0]?.attributes?.name : '---'} ${
                        userData ? userData?.data?.data[0]?.attributes?.lastname : '---'
                      }`}
                    </h2>
                    <p>{data?.data?.email || '---'}</p>
                  </div>
                </div>
                {user?.role === Role.superAdmin ? (
                  <>
                    {data?.data?.role.name === Role.collaborator && (
                      <Button
                        variant="success"
                        onClick={() => {
                          setShowBlockedModal(true);
                        }}
                        className="d-none d-lg-block"
                      >
                        <KeyFill style={{ marginRight: '5px' }} />
                        Cambiar estado
                      </Button>
                    )}
                    {user.id === data?.data?.id && (
                      <div className="d-flex align-items-center justify-content-center">
                        <Button
                          variant="success"
                          onClick={() => navigate(`/app/user/${id}/config`)}
                          className="d-none d-lg-block me-3"
                        >
                          <PencilSquare style={{ marginRight: '5px' }} />
                          Editar usuario
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => {
                            setChangePasswordModal(true);
                          }}
                          className="d-none d-lg-block"
                        >
                          <Key style={{ marginRight: '5px' }} />
                          Cambiar contraseña
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="d-flex align-items-center justify-content-center">
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/user/${id}/config`)}
                      className="d-none d-lg-block me-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar usuario
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        setChangePasswordModal(true);
                      }}
                      className="d-none d-lg-block"
                    >
                      <Key style={{ marginRight: '5px' }} />
                      Cambiar contraseña
                    </Button>
                  </div>
                )}
              </div>
              {user?.role === Role.superAdmin ? (
                <>
                  {data?.data?.role.name === Role.collaborator && (
                    <Button
                      variant="success"
                      onClick={() => {
                        setShowBlockedModal(true);
                      }}
                      className="d-lg-none mt-3"
                    >
                      <KeyFill style={{ marginRight: '5px' }} />
                      Cambiar estado
                    </Button>
                  )}
                  {user.id === data?.data?.id && (
                    <div className="d-flex flex-column">
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/user/${id}/config`)}
                        className="d-lg-none mt-3"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar usuario
                      </Button>
                      <Button
                        variant="success"
                        onClick={() => {
                          setChangePasswordModal(true);
                        }}
                        className="d-lg-none mt-3"
                      >
                        <Key style={{ marginRight: '5px' }} />
                        Cambiar contraseña
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="d-flex flex-column">
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/user/${id}/config`)}
                    className="d-lg-none mt-3"
                  >
                    <PencilSquare style={{ marginRight: '5px' }} />
                    Editar usuario
                  </Button>
                  <Button
                    variant="success"
                    onClick={() => {
                      setChangePasswordModal(true);
                    }}
                    className="d-lg-none mt-3"
                  >
                    <Key style={{ marginRight: '5px' }} />
                    Cambiar contraseña
                  </Button>
                </div>
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
      <AlertModal
        show={showBlockedModal}
        showModal={setShowBlockedModal}
        title={data?.data?.blocked ? 'Habilitar usuario' : 'Bloquear usuario'}
        body={
          <>
            ¿Está seguro que quiere <strong>{`${data?.data?.blocked ? 'habilitar' : 'bloquear'}`}</strong> este usuario?
          </>
        }
        confirmBtn="Aceptar"
        cancelBtn="Cancelar"
        onAction={() => blockedUserMutation.mutate({ userId: id || '', blocked: !data?.data?.blocked })}
        isDisabled={isDisabled}
        setIsDisabled={setIsDisabled}
      />
      <ChangePasswordModal show={changePasswordModal} showModal={setChangePasswordModal} />
    </div>
  );
};

export default User;
