import { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, InputGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './userCreate.module.scss';
import { ExclamationCircle, Eye, EyeSlash, QuestionCircleFill } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRevealPassword } from 'customHooks/useRevealPassword';
import { userSchema } from 'util/validations/userShema';
import Select from 'react-select';
import { useGetCities } from 'customHooks/useGetCities';

interface UserCreateFormProps {}

const schema = yup.object().shape(userSchema);

const UserCreateForm: FC<UserCreateFormProps> = () => {
  //const [showAlert, setShowAlert] = useState(false);
  //const navigate = useNavigate();
  const { revealPassword, togglePassword } = useRevealPassword();
  const { data: dataCities, error, isLoading: isLoadingCities } = useGetCities();
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
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastname: '',
      document: '',
      cellphone: '',
      city: undefined,
      address: '',
    },
  });

  /*const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      storeToken(data.data.jwt);
    },
    onError: (error: any) => {
      if (error.response && error.response.status) {
        setShowAlert(true);
      }
    },
  });*/

  const onSubmit = async (dataForm: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    lastname: string;
    document: string;
    cellphone: string;
    city: number;
    address: string;
  }) => {
    //const { email, password } = dataForm;
    //mutation.mutate({ identifier: email, password });
  };

  /*
  Agregar telefono 
  Agregar ciudad 
  Estilizar formulario nuevamente 
  Revisar validaciones 
  Agregar validaciones telefono 
  Integrar api
  */
  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.userForm}>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Nombre de usuario <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('username')}
          type="text"
          placeholder={'Ingrese el nombre de usuario' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.username}
        />
        <Form.Control.Feedback type="invalid">{errors.username?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Email <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('email')}
          type="text"
          placeholder={'Ingrese el email' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Contraseña <strong className="text-danger me-2">*</strong>
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
            <QuestionCircleFill className={styles.pointer} />
          </OverlayTrigger>
        </Form.Label>
        <InputGroup>
          <Form.Control
            {...register('password')}
            placeholder={'Ingrese la contraseña' || ''}
            //disabled={isLoading}
            isInvalid={!!errors.password}
            type={revealPassword ? 'text' : 'password'}
          />
          <InputGroup.Text>
            <i onClick={togglePassword} className={styles.pointer}>
              {revealPassword ? <Eye /> : <EyeSlash />}
            </i>
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Confirmación contraseña <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <InputGroup>
          <Form.Control
            {...register('confirmPassword')}
            placeholder={'Ingrese la contraseña nuevamente' || ''}
            //disabled={isLoading}
            isInvalid={!!errors.confirmPassword}
            type={revealPassword ? 'text' : 'password'}
          />
          <InputGroup.Text>
            <i onClick={togglePassword} className={styles.pointer}>
              {revealPassword ? <Eye /> : <EyeSlash />}
            </i>
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.confirmPassword?.message}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Nombre <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('name')}
          type="text"
          placeholder={'Ingrese el nombre' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.name}
        />
        <Form.Control.Feedback type="invalid">{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Apellido <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('lastname')}
          type="text"
          placeholder={'Ingrese el apellido' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.lastname}
        />
        <Form.Control.Feedback type="invalid">{errors.lastname?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Documento <strong className="text-danger me-2">*</strong>{' '}
          <OverlayTrigger
            placement="right"
            delay={{ show: 250, hide: 400 }}
            overlay={<Tooltip>Debe ingresar el documento sin puntos ni guiones</Tooltip>}
          >
            <QuestionCircleFill className={styles.pointer} />
          </OverlayTrigger>
        </Form.Label>
        <Form.Control
          {...register('document')}
          type="text"
          placeholder={'Ingrese el documento' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.document}
        />
        <Form.Control.Feedback type="invalid">{errors.document?.message}</Form.Control.Feedback>
      </Form.Group>
      //Cellphone
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Ciudad/localidad <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="city"
          control={control}
          render={({ field }) => (
            <Select
              options={dataCities}
              isLoading={isLoadingCities}
              value={dataCities.find(c => c.value === field.value)}
              onChange={val => field.onChange(val.value)}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  borderColor: !!errors.city ? '#dc3545' : '#dee2e6',
                  borderRadius: '0.375rem',
                  visibility: 'visible',
                  height: '40px',
                  fontSize: '14px',
                  alignContent: 'center',
                }),
              }}
              menuPlacement="auto"
              isSearchable={false}
              name="city"
              isDisabled={isLoadingCities}
              placeholder={'Seleccione una ciudad/localidad'}
            ></Select>
          )}
        />
        {errors.city?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.city?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Dirección <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('address')}
          type="text"
          placeholder={'Ingrese la dirección' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          //disabled={isLoading}
          className="me-3"
        >
          Cancelar
        </Button>
        <Button
          variant="success"
          type="submit"
          //disabled={isLoading}
          className=""
        >
          Registrar usuario
        </Button>
      </div>
    </Form>
  );
};

export default UserCreateForm;
