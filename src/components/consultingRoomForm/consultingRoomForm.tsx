import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { ConsultingRoomData } from 'models/ConsultingRoom';
import { consultingRoomSchema } from 'util/validations/consultingRoomSchema';
import { createConsultingRoom, editConsultingRoom } from 'api/consultingRoom';
import { ConsultingRoomStatusEnum } from 'models/ConsultingRoomStatus';
import styles from './consultingRoomForm.module.scss';

interface ConsultingRoomFormProps {
  edit?: boolean;
  consultingRoomData?: ConsultingRoomData;
}

const schema = yup.object().shape(consultingRoomSchema);

const ConsultingRoomForm: FC<ConsultingRoomFormProps> = ({ edit = false, consultingRoomData }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
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
      name: edit && consultingRoomData ? consultingRoomData.attributes?.name || '' : '',
      description: edit && consultingRoomData ? consultingRoomData.attributes?.description || '' : '',
      necessaryAction: edit && consultingRoomData ? consultingRoomData.attributes?.necessaryAction || '' : null,
    },
  });

  const mutationConsultingRoomCreate = useMutation({
    mutationFn: createConsultingRoom,
    onSuccess: () => {
      toast(<SuccessToast message={`Consultorio registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/consultingsRooms`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el consultorio, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationConsultingRoomEdit = useMutation({
    mutationFn: editConsultingRoom,
    onSuccess: () => {
      toast(<SuccessToast message={`Consultorio editado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/consultingsRooms`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar el consultorio, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { name: string; necessaryAction?: string | null; description?: string }) => {
    setIsDisabled(true);
    if (edit) {
      mutationConsultingRoomEdit.mutate({
        consultingRoomId: consultingRoomData?.id || '',
        name: dataForm.name,
        necessaryAction: dataForm.necessaryAction || '',
        description: dataForm.description || '',
      });
    } else {
      mutationConsultingRoomCreate.mutate({
        name: dataForm.name,
        necessaryAction: dataForm.necessaryAction || '',
        description: dataForm.description || '',
        status: ConsultingRoomStatusEnum.available,
      });
    }
  };

  return (
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
      <Form.Group className="form-outline mb-4">
        <Form.Label>Acción necesaria</Form.Label>
        <Form.Control
          {...register('necessaryAction')}
          as="textarea"
          rows={3}
          placeholder={'Ingrese acción necesaria' || ''}
          isInvalid={!!errors.necessaryAction}
        />
        <Form.Control.Feedback type="invalid">{errors.necessaryAction?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/app/consultingsRooms`);
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
  );
};

export default ConsultingRoomForm;
