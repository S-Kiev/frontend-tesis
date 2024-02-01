import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './treatmentsCreateForm.module.scss';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { useGetConsultingRooms } from 'customHooks/useGetConsultingRooms';
import { useGetEquipments } from 'customHooks/useGetEquipments';
import { treatmentsSchema } from 'util/validations/treatmentsSchema';
import Select from 'react-select';
import { createTreatment, editTreatment } from 'api/treatment';
import { TreatmentGetData } from 'models/Treatments';
import { parseEquipments } from 'util/parseEquipments';
import { parseConsultingsRooms } from 'util/parseConsultingRooms';

interface TreatmentsCreateFormProps {
  edit?: boolean;
  treatmentData?: TreatmentGetData;
}

const schema = yup.object().shape(treatmentsSchema);

const TreatmentsCreateForm: FC<TreatmentsCreateFormProps> = ({ edit, treatmentData }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { data: dataConsultingRooms, isLoading: isLoadingConsultingsRooms } = useGetConsultingRooms();
  const { data: dataEquipments, isLoading: isLoadingEquipments } = useGetEquipments();
  const equipmentsArray =
    edit && treatmentData ? parseEquipments(treatmentData?.attributes?.equipments?.data || []) : [];
  const consultingRoomsArray =
    edit && treatmentData ? parseConsultingsRooms(treatmentData?.attributes?.consultingRooms?.data || []) : [];
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: edit && treatmentData ? treatmentData?.attributes?.name || '' : '',
      equipments: equipmentsArray,
      consultingRooms: consultingRoomsArray,
      description: edit && treatmentData ? treatmentData?.attributes?.description || '' : '',
    },
  });

  const mutationTreatmentsCreate = useMutation({
    mutationFn: createTreatment,
    onSuccess: () => {
      toast(<SuccessToast message={`Tratamiento registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/treatments`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el tratamiento, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationTreatmentsEdit = useMutation({
    mutationFn: editTreatment,
    onSuccess: () => {
      toast(<SuccessToast message={`Tratamiento editado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/treatments`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar el tratamiento, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: {
    name: string;
    equipments?: ({ value: string; label: string; show: boolean } | undefined)[] | null | undefined;
    consultingRooms: ({ value: string; label: string } | undefined)[];
    description?: string;
  }) => {
    setIsDisabled(true);
    if (edit) {
      mutationTreatmentsEdit.mutate({
        treatmentId: treatmentData?.id || '',
        name: dataForm.name,
        description: dataForm.description || '',
        equipments:
          dataForm?.equipments?.map(equipment => {
            return Number(equipment?.value);
          }) || [],
        consultingRooms: dataForm.consultingRooms.map(consultingRoom => {
          return Number(consultingRoom?.value);
        }),
      });
    } else {
      mutationTreatmentsCreate.mutate({
        name: dataForm.name,
        description: dataForm.description || '',
        equipments:
          dataForm?.equipments?.map(equipment => {
            return Number(equipment?.value);
          }) || [],
        consultingRooms: dataForm.consultingRooms.map(consultingRoom => {
          return Number(consultingRoom?.value);
        }),
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Form.Group className="form-outline mb-4">
          <Form.Label>
            Nombre <strong className="text-danger me-2">*</strong>
          </Form.Label>
          <Form.Control
            {...register('name')}
            type="text"
            placeholder={'Ingrese el nombre' || ''}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="form-outline mb-4">
          <Form.Label>Equipamiento</Form.Label>
          <Controller
            name="equipments"
            control={control}
            render={({ field }) => (
              <Select
                options={dataEquipments}
                isOptionDisabled={option => option.show === false}
                isLoading={isLoadingEquipments}
                value={dataEquipments.find(c => c.value === field.value)}
                defaultValue={equipmentsArray}
                onChange={val => field.onChange(val)}
                styles={{
                  control: baseStyles => ({
                    ...baseStyles,
                    borderColor: !!errors.equipments ? '#dc3545' : '#dee2e6',
                    borderRadius: '0.375rem',
                    fontSize: '14px',
                  }),
                }}
                menuPlacement="auto"
                isSearchable
                isMulti
                noOptionsMessage={() => 'No hay opciones'}
                name="equipments"
                isDisabled={isLoadingEquipments}
                placeholder={'Seleccione equipamiento'}
              />
            )}
          />
          {errors.equipments?.message && (
            <div className="d-flex align-items-center">
              <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                {errors.equipments?.message}
              </span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="form-outline mb-4">
          <Form.Label>
            Consultorios <strong className="text-danger me-2">*</strong>
          </Form.Label>
          <Controller
            name="consultingRooms"
            control={control}
            render={({ field }) => (
              <Select
                options={dataConsultingRooms}
                isLoading={isLoadingConsultingsRooms}
                value={dataConsultingRooms.find(c => c.value === field.value)}
                defaultValue={consultingRoomsArray}
                onChange={val => field.onChange(val)}
                styles={{
                  control: baseStyles => ({
                    ...baseStyles,
                    borderColor: !!errors.consultingRooms ? '#dc3545' : '#dee2e6',
                    borderRadius: '0.375rem',
                    fontSize: '14px',
                  }),
                }}
                menuPlacement="auto"
                isSearchable
                isMulti
                noOptionsMessage={() => 'No hay opciones'}
                name="consultingRooms"
                isDisabled={isLoadingConsultingsRooms}
                placeholder={'Seleccione consultorios'}
              />
            )}
          />
          {errors.consultingRooms?.message && (
            <div className="d-flex align-items-center">
              <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                {errors.consultingRooms?.message}
              </span>
            </div>
          )}
        </Form.Group>
        <Form.Group className="form-outline mb-4">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            {...register('description')}
            as="textarea"
            rows={3}
            placeholder={'Ingrese una descripción' || ''}
            isInvalid={!!errors.description}
          />
          <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
        </Form.Group>
        <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
          <Button
            variant="secondary"
            type="button"
            className="me-3"
            onClick={() => {
              navigate(`/app/treatments`);
            }}
          >
            Cancelar
          </Button>
          <Button variant="success" type="submit" disabled={isDisabled}>
            {isDisabled && <Spinner className="me-1" size="sm" />}
            <span>{edit ? 'Guardar cambios' : 'Guardar'}</span>
          </Button>
        </div>
      </Form>
    </>
  );
};

export default TreatmentsCreateForm;
