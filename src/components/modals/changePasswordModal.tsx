import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { editPassword } from 'api/users';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { useRevealPassword } from 'customHooks/useRevealPassword';
import { FC, useState } from 'react';
import { Alert, Form, InputGroup, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { ExclamationTriangleFill, Eye, EyeSlash, Key, QuestionCircleFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { passwordEditSchema } from 'util/validations/userEditSchema';
import * as yup from 'yup';

interface ChangePasswordModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
}

const schema = yup.object().shape(passwordEditSchema);

export const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ show, showModal }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [alertCurrentPassword, setAlertCurrentPassword] = useState(false);
  const { revealPassword, togglePassword } = useRevealPassword();
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
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const mutationChangePassword = useMutation({
    mutationFn: editPassword,
    onSuccess: () => {
      toast(<SuccessToast message={`Contraseña cambiada con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      showModal(false);
    },
    onError: (data: any) => {
      if (data?.response?.data?.error?.message === 'The provided current password is invalid') {
        setAlertCurrentPassword(true);
      } else {
        toast(<ErrorToast message={`Ha ocurrido un error al editar la contraseña, intente nuevamente`} />, {
          style: { borderRadius: '10px' },
        });
      }
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    setIsDisabled(true);
    setAlertCurrentPassword(false);
    mutationChangePassword.mutate({
      currentPassword: dataForm.currentPassword,
      password: dataForm.newPassword,
      passwordConfirmation: dataForm.confirmPassword,
    });
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Key /> Cambio de contraseña
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ margin: '10px 10px' }}>
            {alertCurrentPassword && (
              <Alert variant="danger" className="mt-2">
                <div className="d-flex align-items-center">
                  <ExclamationTriangleFill className="me-2" /> La contraseña actual ingresada es incorrecta
                </div>
              </Alert>
            )}
            <Form.Group className="form-outline mb-4">
              <Form.Label>
                Contraseña actual <strong className="text-danger me-2">*</strong>
              </Form.Label>
              <InputGroup>
                <Form.Control
                  {...register('currentPassword')}
                  placeholder={'Contraseña actual' || ''}
                  isInvalid={!!errors.currentPassword}
                  type={revealPassword ? 'text' : 'password'}
                />
                <InputGroup.Text>
                  <i onClick={togglePassword} style={{ cursor: 'pointer' }}>
                    {revealPassword ? <Eye /> : <EyeSlash />}
                  </i>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">{errors.currentPassword?.message}</Form.Control.Feedback>
              </InputGroup>
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
                  {...register('confirmPassword')}
                  placeholder={'Ingrese la nueva contraseña' || ''}
                  isInvalid={!!errors.confirmPassword}
                  type={revealNewPassword ? 'text' : 'password'}
                />
                <InputGroup.Text>
                  <i onClick={toggleNewPassword} style={{ cursor: 'pointer' }}>
                    {revealNewPassword ? <Eye /> : <EyeSlash />}
                  </i>
                </InputGroup.Text>
                <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
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
              <Button variant="success" type="submit" disabled={isDisabled}>
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
