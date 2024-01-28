import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './consultationCreateForm.module.scss';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { consultationSchema } from 'util/validations/consultationSchema';

interface ConsultationsCreateFormProps {}

const schema = yup.object().shape(consultationSchema);

const ConsultationsCreateForm: FC<ConsultationsCreateFormProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      customer: undefined,
      treatments: [],
      equipments: [],
      consultingRooms: [],
      dateSinceConsultation: '',
      dateUntilConsultation: '',
      comments: '',
    },
  });

  /*const mutationUser = useMutation({
    mutationFn: createUser,
    onSuccess: (data: any) => {
      const userId: number = data.data.id;
      const userData: any = getValues();
      mutationUserData.mutate({
        name: userData.name,
        lastname: userData.lastname,
        document: userData.document,
        cellphone: userData.cellphone.slice(1, -1),
        city: userData.city,
        address: userData.address,
        userId: userId,
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el usuario, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationUserData = useMutation({
    mutationFn: createUserData,
    onSuccess: () => {
      toast(<SuccessToast message={`Usuario registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/users`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el usuario, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });*/

  const onSubmit = async (dataForm: {
    customer: number;
    treatments: ({ value: string; label: string } | undefined)[];
    equipments: ({ value: string; label: string; show: boolean } | undefined)[];
    consultingRooms: ({ value: string; label: string; show: boolean } | undefined)[];
    dateSinceConsultation: string;
    dateUntilConsultation: string;
    comments: string;
  }) => {
    setIsDisabled(true);
    /*mutationUser.mutate({
      username: dataForm.username,
      email: dataForm.email,
      password: dataForm.password,
      role: 4,
      confirmed: true,
    });*/
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      //Contenido form
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/app/consultations`);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit" disabled={isDisabled}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Guardar</span>
        </Button>
      </div>
    </Form>
  );
};

export default ConsultationsCreateForm;
