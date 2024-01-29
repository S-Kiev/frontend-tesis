import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { ClipboardCheck, ExclamationTriangleFill } from 'react-bootstrap-icons';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import Select from 'react-select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SuccessToast from 'components/toast/successToast';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import { ConsultingRoomData } from 'models/ConsultingRoom';
import { changeStatusConsultingRoomSchema } from 'util/validations/changeStatusConsultingRoomSchema';
import ConsultingRoomStatus from 'components/consultingRoomStatus/consultingRoomStatus';
import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';
import { changeStatusConsultingRoom, createConsultingRoomHistory } from 'api/consultingRoom';
import { QueryKeys } from 'api/QueryKeys';

interface ChangeStatusConsultingRoomModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  consultingRoomData: ConsultingRoomData;
}

const schema = yup.object().shape(changeStatusConsultingRoomSchema);

export const ChangeStatusConsultingRoomModal: FC<ChangeStatusConsultingRoomModalProps> = ({
  show,
  showModal,
  consultingRoomData,
}) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const occupiedStatus: boolean = consultingRoomData?.attributes?.status === ConsultingRoomStatusEnum.occupied;
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors, defaultValues },
    control,
    getValues,
    reset,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      newStatus: '',
    },
  });

  const statusSelect: { value: ConsultingRoomStatusEnum; label: string; show: boolean }[] = [
    {
      value: ConsultingRoomStatusEnum.available,
      label: 'Disponible',
      show: consultingRoomData?.attributes?.status !== ConsultingRoomStatusEnum.available,
    },
    {
      value: ConsultingRoomStatusEnum.outOfUse,
      label: 'Fuera de servicio',
      show: consultingRoomData?.attributes?.status !== ConsultingRoomStatusEnum.outOfUse,
    },
  ];

  const mutationChangeStatusConsultingRoom = useMutation({
    mutationFn: changeStatusConsultingRoom,
    onSuccess: () => {
      const values = getValues();

      mutationCreateConsultingRoomHistory.mutate({
        consultingRoom: consultingRoomData?.id || '',
        status: values.newStatus || '',
        since: new Date().toISOString(),
        until: null,
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al intentar cambiar el estado, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationCreateConsultingRoomHistory = useMutation({
    mutationFn: createConsultingRoomHistory,
    onSuccess: () => {
      const values = getValues();
      toast(<SuccessToast message={`Estado registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      if (values.newStatus === ConsultingRoomStatusEnum.outOfUse) {
        toast.warn(
          'Se aconseje revisar tratamientos y consultas que puedan verse afectados por sacar de uso el consultorio',
        );
      }
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ConsultingRoom, consultingRoomData.id],
      });
      setIsDisabled(false);
      reset(defaultValues);
      showModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al intentar cambiar el estado, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { newStatus: string }) => {
    setIsDisabled(true);
    mutationChangeStatusConsultingRoom.mutate({
      consultingRoomId: consultingRoomData?.id || '',
      status: dataForm.newStatus,
    });
  };

  return (
    <>
      <Modal
        onHide={() => {
          showModal(false);
          reset(defaultValues);
        }}
        show={show}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <ClipboardCheck /> Cambio estado de disponibilidad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '0px 10px 20px 10px' }} className="d-flex align-items-center">
            <strong>Estado actual:</strong>
            <div className="mt-2 ms-2">
              <ConsultingRoomStatus status={consultingRoomData?.attributes?.status} />
            </div>
          </div>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ margin: '10px 10px' }}>
            {occupiedStatus && (
              <Alert variant="danger" className="mt-2">
                <div className="d-flex align-items-center">
                  <ExclamationTriangleFill className="me-3" size={70} /> No se puede editar el estado de disponibilidad
                  cuando el estado es ocupado, vuelva cuando este cambie.
                </div>
              </Alert>
            )}
            {!occupiedStatus && (
              <>
                <Form.Group className="form-outline mb-4">
                  <Form.Label>
                    Nuevo estado <strong className="text-danger me-2">*</strong>
                  </Form.Label>
                  <Controller
                    name="newStatus"
                    control={control}
                    render={({ field }) => (
                      <Select
                        options={statusSelect}
                        isOptionDisabled={option => option.show === false}
                        value={statusSelect.find(o => o.value === field.value)}
                        onChange={val => field.onChange(val?.value)}
                        styles={{
                          control: baseStyles => ({
                            ...baseStyles,
                            borderColor: !!errors.newStatus ? '#dc3545' : '#dee2e6',
                            borderRadius: '0.375rem',
                            visibility: 'visible',
                            height: '40px',
                            fontSize: '14px',
                            alignContent: 'center',
                          }),
                        }}
                        menuPlacement="auto"
                        isSearchable={false}
                        name="newStatus"
                        placeholder={'Seleccione una estado'}
                      />
                    )}
                  />
                  {errors.newStatus?.message && (
                    <div className="d-flex align-items-center">
                      <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                        {errors.newStatus?.message}
                      </span>
                    </div>
                  )}
                </Form.Group>
              </>
            )}
            <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px' }}>
              <Button
                variant="secondary"
                type="button"
                className="me-3"
                disabled={isDisabled}
                onClick={() => {
                  showModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button variant="success" type="submit" disabled={isDisabled || occupiedStatus}>
                {isDisabled && <Spinner className="me-1" size="sm" />}
                <span>Aceptar</span>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
