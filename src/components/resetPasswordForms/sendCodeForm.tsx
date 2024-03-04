import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './resetPasswordForms.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../util/styles/phoneNumberInput.scss';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { sendCode } from 'api/user';

interface SendCodeFormProps {
  setStep: (state: number) => void;
  setUser: (state: number | null) => void;
}

const schema = yup.object().shape({
  email: yup.string().email('Debe ingresar un email válido').required('Este campo es requerido'),
});

const SendCodeForm: FC<SendCodeFormProps> = ({ setStep, setUser }) => {
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
      email: '',
    },
  });

  const sendCodeMutation = useMutation({
    mutationFn: sendCode,
    onSuccess: (data: any) => {
      setUser(data?.data?.userId);
      toast(<SuccessToast message={`Código enviado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      setStep(2);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al enviar el código, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { email: string }) => {
    setIsDisabled(true);
    sendCodeMutation.mutate(dataForm.email);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
        <Alert variant="success" className="mt-2">
          Ingrese el email con el que esta registrado, si esta en el sistema recibira un mensaje de Whatsapp con un
          codigo para resetear su contraseña de forma segura.
        </Alert>
        <Form.Label>
          Email <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('email')}
          type="text"
          placeholder={'Ingrese su email' || ''}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/login`);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit" disabled={isDisabled}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Enviar</span>
        </Button>
      </div>
    </Form>
  );
};

export default SendCodeForm;
