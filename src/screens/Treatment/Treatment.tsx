import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { desactivateTreatment, getTreatment } from 'api/treatment';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './Treatment.module.scss';
import { DotLoader } from 'react-spinners';
import { ChevronLeft, CloudLightningRain, PencilSquare, SlashCircle } from 'react-bootstrap-icons';
import { Role } from 'models/Roles';
import { Button } from 'react-bootstrap';
import TreatmentCrad from 'components/treatmentCrad/treatmentCrad';
import SuccessToast from 'components/toast/successToast';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import { AlertModal } from 'components/modals/alertModal';

interface TreatmentProps {}

const Treatment: FC<TreatmentProps> = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);
  const queryClient = useQueryClient();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Treatment, id],
    queryFn: () => getTreatment(id || ''),
  });

  const desactivationTratementMutation = useMutation({
    mutationFn: desactivateTreatment,
    mutationKey: [QueryKeys.DesactivateTreatment, id],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.Treatment, id],
      });
      toast(<SuccessToast message={`Tratamiento desactivado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setShowModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al desactivar el tratamiento, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
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
                    <h2 className={styles.headline}>{data?.data?.data?.attributes?.name || '---'}</h2>
                    <p>Ver detalle del tratamiento</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator ? (
                    <>
                      <Button
                        variant="success"
                        onClick={() => navigate(`/app/treatments/${id}/edit`)}
                        className="d-none d-lg-block"
                      >
                        <PencilSquare style={{ marginRight: '5px' }} />
                        Editar
                      </Button>
                      {!data?.data?.data?.attributes?.deactivationDate && (
                        <Button
                          variant="danger"
                          onClick={() => {
                            setShowModal(true);
                          }}
                          className="d-none d-lg-block"
                        >
                          <SlashCircle style={{ marginRight: '5px' }} />
                          Desactivar tratamiento
                        </Button>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator ? (
                  <>
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/treatments/${id}/edit`)}
                      className="d-lg-none mt-3"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                    {!data?.data?.data?.attributes?.deactivationDate && (
                      <Button
                        variant="danger"
                        onClick={() => {
                          setShowModal(true);
                        }}
                        className="d-lg-none mt-3"
                      >
                        <SlashCircle style={{ marginRight: '5px' }} />
                        Desactivar tratamiento
                      </Button>
                    )}
                  </>
                ) : null}
              </div>
              <div className={styles.form}>{<TreatmentCrad treatmentData={data?.data?.data} />}</div>
            </>
          )}
          <AlertModal
            show={showModal}
            showModal={setShowModal}
            title={'Desactivar tratamiento'}
            body={
              <>
                ¿Está seguro que quiere <strong>desactivar</strong> este tratamiento?
              </>
            }
            confirmBtn="Desactivar"
            cancelBtn="Cancelar"
            onAction={() => desactivationTratementMutation.mutate(id || '')}
            isDisabled={isDisabled}
            setIsDisabled={setIsDisabled}
          />
        </>
      )}
    </div>
  );
};

export default Treatment;
