import { yupResolver } from '@hookform/resolvers/yup';
import EquipmentStatus from 'components/equipmentStatus/equipmentStatus';
import { EquipmentData } from 'models/Equipment';
import { FC, useState } from 'react';
import { Alert, Button, Form, Modal, Spinner } from 'react-bootstrap';
import { ClipboardCheck, ExclamationTriangleFill } from 'react-bootstrap-icons';
import { Controller, useForm } from 'react-hook-form';
import { changeStatusEquipmentSchema } from 'util/validations/changeStatusEquipmentSchema';
import * as yup from 'yup';
import Select from 'react-select';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';
import DatePicker from 'react-datepicker';
import '../../../util/styles/datepicker.scss';
import styles from './changeStatusEquipmentModal.module.scss';
import { useMutation } from '@tanstack/react-query';
import { createEquipmentHistory, editEquipmentStatus } from 'api/equipment';
import SuccessToast from 'components/toast/successToast';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';

interface ChangeStatusEquipmentModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  equipmentData: EquipmentData;
}

const schema = yup.object().shape(changeStatusEquipmentSchema);

export const ChangeStatusEquipmentModal: FC<ChangeStatusEquipmentModalProps> = ({ show, showModal, equipmentData }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const occupiedStatus: boolean = equipmentData?.attributes?.status === EquipmentStatusEnum.occupied;
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      newStatus: '',
      since: '',
      until: '',
    },
  });

  const statusSelect: { value: EquipmentStatusEnum; label: string; show: boolean }[] = [
    {
      value: EquipmentStatusEnum.available,
      label: 'Disponible',
      show: equipmentData?.attributes?.status !== EquipmentStatusEnum.available,
    },
    {
      value: EquipmentStatusEnum.rented,
      label: 'Alquilado',
      show: true,
    },
    {
      value: EquipmentStatusEnum.broken,
      label: 'Averiado',
      show: equipmentData?.attributes?.status !== EquipmentStatusEnum.broken,
    },
    {
      value: EquipmentStatusEnum.outOfUse,
      label: 'Fuera de uso',
      show: equipmentData?.attributes?.status !== EquipmentStatusEnum.outOfUse,
    },
  ];

  const dateParse = (field): Date | null => {
    return field ? new Date(Date.parse(field)) : null;
  };

  const mutationChangeStatusEquipment = useMutation({
    mutationFn: editEquipmentStatus,
    onSuccess: () => {
      const values = getValues();

      if (values.newStatus !== EquipmentStatusEnum.rented) {
        mutationCreateEquipmentHistory.mutate({
          equipment: equipmentData?.id || '',
          status: values.newStatus || '',
          since: new Date().toISOString(),
          until: null,
        });
      }
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al intentar cambiar el estado, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationCreateEquipmentHistory = useMutation({
    mutationFn: createEquipmentHistory,
    onSuccess: () => {
      const values = getValues();

      toast(<SuccessToast message={`Estado registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      if (values.newStatus === EquipmentStatusEnum.outOfUse) {
        toast.warn('Se aconseje revisar tratamientos que puedan verse afectados por sacar de circulación el equipo');
      }
      if (values.newStatus === EquipmentStatusEnum.broken) {
        toast.warn('Se aconseje revisar consultas y alquileres que puedan verse afectados por la ruptura del equipo');
      }
      setIsDisabled(false);
      showModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al intentar cambiar el estado, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { newStatus: string; since?: string; until?: string }) => {
    setIsDisabled(true);
    if (dataForm.newStatus !== EquipmentStatusEnum.rented) {
      mutationChangeStatusEquipment.mutate({
        equipmentId: equipmentData?.id || '',
        status: dataForm.newStatus,
      });
    } else {
      mutationCreateEquipmentHistory.mutate({
        equipment: equipmentData?.id || '',
        status: dataForm.newStatus || '',
        since: new Date(dataForm?.since || '').toISOString(),
        until: new Date(dataForm?.until || '').toISOString(),
      });
    }
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <ClipboardCheck /> Cambio estado de disponibilidad
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: '0px 10px 20px 10px' }} className="d-flex align-items-center">
            <strong>Estado actual:</strong>
            <div className="mt-2 ms-2">
              <EquipmentStatus status={equipmentData?.attributes?.status} />
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
                {watch('newStatus') === EquipmentStatusEnum.rented && (
                  <>
                    <Form.Group className="form-outline mb-4">
                      <Form.Label>
                        Desde <strong className="text-danger me-2">*</strong>
                      </Form.Label>
                      <Controller
                        name="since"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            showIcon
                            showMonthDropdown
                            showTimeSelect
                            placeholderText="Ingrese desde"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            locale="es"
                            selected={dateParse(field?.value)}
                            onChange={date => field.onChange(date)}
                            minDate={new Date()}
                            wrapperClassName={errors.since?.message ? styles.datepickerError : styles.datepicker}
                          />
                        )}
                      />
                      {errors.since?.message && (
                        <div className="d-flex align-items-center">
                          <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                            {errors.since?.message}
                          </span>
                        </div>
                      )}
                    </Form.Group>
                    <Form.Group className="form-outline mb-4">
                      <Form.Label>
                        Hasta <strong className="text-danger me-2">*</strong>
                      </Form.Label>
                      <Controller
                        name="until"
                        control={control}
                        render={({ field }) => (
                          <DatePicker
                            showIcon
                            showMonthDropdown
                            showTimeSelect
                            placeholderText="Ingrese hasta"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            locale="es"
                            selected={dateParse(field?.value)}
                            onChange={date => field.onChange(date)}
                            minDate={new Date()}
                            wrapperClassName={errors.until?.message ? styles.datepickerError : styles.datepicker}
                          />
                        )}
                      />
                      {errors.until?.message && (
                        <div className="d-flex align-items-center">
                          <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                            {errors.until?.message}
                          </span>
                        </div>
                      )}
                    </Form.Group>
                  </>
                )}
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
              <Button
                variant="success"
                type="submit"
                disabled={
                  isDisabled ||
                  occupiedStatus ||
                  (watch('newStatus') === equipmentData?.attributes?.status &&
                    equipmentData?.attributes?.status !== EquipmentStatusEnum.rented)
                }
              >
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
