import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, InputGroup, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styles from './resetPasswordForms.module.scss';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import '../../util/styles/phoneNumberInput.scss';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { ExclamationCircleFill, Eye, EyeSlash, QuestionCircleFill } from 'react-bootstrap-icons';
import { useRevealPassword } from 'customHooks/useRevealPassword';
import { changePasswordByWhatsapp } from 'api/user';

interface ResetPasswordFormProps {
  user: number | null;
  setStep: (state: number) => void;
}

const REQUIREDMESSAGE = 'Este campo es requerido';
const VALIDPASSWORD = 'Debe ingresar una contraseña valida';
const schema = yup.object().shape({
  code: yup.string().required(REQUIREDMESSAGE),
  newPassword: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .min(8, VALIDPASSWORD)
    .matches(/\d/, VALIDPASSWORD)
    .matches(/[A-Z]/, VALIDPASSWORD)
    .matches(/[^\w]/, VALIDPASSWORD),
  confirmNewPassword: yup
    .string()
    .trim()
    .required(REQUIREDMESSAGE)
    .oneOf([yup.ref('newPassword')], 'Las contraseñas no coinciden'),
});

const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ user, setStep }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [alert, setAlert] = useState<{ alert: boolean; message: string }>({ alert: false, message: '' });
  const navigate = useNavigate();
  const { revealPassword: revealNewPassword, togglePassword: toggleNewPassword } = useRevealPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      code: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: changePasswordByWhatsapp,
    onSuccess: () => {
      toast(<SuccessToast message={`Contraseña modificada con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/login`);
    },
    onError: (data: any) => {
      if (data?.response?.data?.message === 'código incorrecto') {
        setAlert({ alert: true, message: 'El codigo ingresado es incorrecto, pruebe nuevamente' });
      }
      if (data?.response?.data?.message === 'Su código ha expirado, vuelva a solicitar otro') {
        setAlert({
          alert: true,
          message: 'El codigo ingresado ya expiro, solicité el envio de otro codigo de seguridad',
        });
      }
      toast(<ErrorToast message={`Ha ocurrido un error, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { code: string; newPassword: string; confirmNewPassword: string }) => {
    setIsDisabled(true);
    setAlert({ alert: false, message: '' });
    changePasswordMutation.mutate({
      id: user,
      code: dataForm.code,
      newPassword: dataForm.newPassword,
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Alert variant="success" className="mt-2">
        Pasado unos minutos, si no has recibido aun el codigo de seguridad o ya caduco vuelva a solicitarlo{' '}
        {
          <Link onClick={() => setStep(1)} to={'#'} className={`text-muted`}>
            <strong>aqui</strong>
          </Link>
        }
      </Alert>
      {alert.alert && (
        <Alert variant="danger" className="mt-2">
          <ExclamationCircleFill size={20} className="me-2" /> {alert.message}
        </Alert>
      )}
      <Form.Group className="form-outline mb-4">
        <Form.Label>Código de seguridad</Form.Label>
        <Form.Control
          {...register('code')}
          type="text"
          placeholder="Ingrese el código de seguridad"
          isInvalid={!!errors.code}
        />
        <Form.Control.Feedback type="invalid">{errors.code?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Nueva contraseña <strong className="text-danger me-2">*</strong>
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={
              <Tooltip>
                Una contraseña debe tener:
                <ul>
                  <li>Un mínimo de 8 caracteres.</li>
                  <li>Contener al menos una mayúscula.</li>
                  <li>Contener al menos un número.</li>
                  <li>Contener al menos un carácter especial. Por ejemplo: “@”, “.”, “*”,“$”.</li>
                </ul>
              </Tooltip>
            }
          >
            <QuestionCircleFill style={{ cursor: 'pointer' }} />
          </OverlayTrigger>
        </Form.Label>
        <InputGroup>
          <Form.Control
            {...register('newPassword')}
            placeholder={'Nueva contraseña' || ''}
            isInvalid={!!errors.newPassword}
            type={revealNewPassword ? 'text' : 'password'}
          />
          <InputGroup.Text>
            <i onClick={toggleNewPassword} style={{ cursor: 'pointer' }}>
              {revealNewPassword ? <Eye /> : <EyeSlash />}
            </i>
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.newPassword?.message}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="form-outline">
        <Form.Label>
          Confirmación contraseña <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <InputGroup>
          <Form.Control
            {...register('confirmNewPassword')}
            placeholder={'Ingrese la nueva contraseña' || ''}
            isInvalid={!!errors.confirmNewPassword}
            type={revealNewPassword ? 'text' : 'password'}
          />
          <InputGroup.Text>
            <i onClick={toggleNewPassword} style={{ cursor: 'pointer' }}>
              {revealNewPassword ? <Eye /> : <EyeSlash />}
            </i>
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.confirmNewPassword?.message}</Form.Control.Feedback>
        </InputGroup>
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
          <span>Guardar</span>
        </Button>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
