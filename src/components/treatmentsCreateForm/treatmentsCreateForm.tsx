import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './treatmentsCreateForm.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { equipmentSchema } from 'util/validations/equipmentSchema';
import { useGetConsultingRooms } from 'customHooks/useGetConsultingRooms';

interface TreatmentsCreateFormProps {}

const schema = yup.object().shape(equipmentSchema);

const TreatmentsCreateForm: FC<TreatmentsCreateFormProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { data: dataConsultingRooms, isLoading: isLoadingCities } = useGetConsultingRooms();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      brand: '',
      description: '',
    },
  });

  console.log(dataConsultingRooms);

  /* const mutationEquipment = useMutation({
    mutationFn: createEquipment,
    onSuccess: () => {
      toast(<SuccessToast message={`Equipo registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/equipments`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el equipo, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });*/

  /* const onSubmit = async (dataForm: { name: string; brand?: string; description?: string }) => {
    setIsDisabled(true);
    mutationEquipment.mutate({
      name: dataForm.name,
      brand: dataForm.brand || '',
      description: dataForm.description || '',
      status: EquipmentStatusEnum.available,
    });
  };*/

  return (
    <>
      {/*<Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
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
        <Form.Label>
          Marca <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('brand')}
          type="text"
          placeholder={'Ingrese la marca' || ''}
          isInvalid={!!errors.brand}
        />
        <Form.Control.Feedback type="invalid">{errors.brand?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Descripción</Form.Label>
        <Form.Control
          {...register('description')}
          type="text"
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
            navigate(`/app/equipments`);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit" disabled={isDisabled}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Guardar</span>
        </Button>
      </div>
        </Form>*/}
    </>
  );
};

export default TreatmentsCreateForm;
