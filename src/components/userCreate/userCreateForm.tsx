import { FC, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './userCreate.module.scss';
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRevealPassword } from 'customHooks/useRevealPassword';
import { userSchema } from 'util/validations/userShema';

interface UserCreateFormProps {}

const schema = yup.object().shape(userSchema);

const UserCreateForm: FC<UserCreateFormProps> = () => {
  //const [showAlert, setShowAlert] = useState(false);
  //const navigate = useNavigate();
  const { revealPassword, togglePassword } = useRevealPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      city: '',
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

  const onSubmit = async (dataForm: { email: string; password: string }) => {
    const { email, password } = dataForm;
    //mutation.mutate({ identifier: email, password });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="form-outline mb-4" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          {...register('email')}
          type="text"
          placeholder={'Ingrese su email' || ''}
          //disabled={isLoading}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Contraseña</Form.Label>
        <InputGroup>
          <Form.Control
            {...register('password')}
            placeholder={'Ingrese su contraseña' || ''}
            //disabled={isLoading}
            isInvalid={!!errors.password}
            type={revealPassword ? 'text' : 'password'}
          />
          <InputGroup.Text>
            <i onClick={togglePassword} className={styles.passwordEye}>
              {revealPassword ? <Eye /> : <EyeSlash />}
            </i>
          </InputGroup.Text>
          <Form.Control.Feedback type="invalid">{errors.password?.message}</Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <div className="text-center pt-3 mb-5 pb-1">
        <Button
          variant="success"
          type="submit"
          //disabled={isLoading}
          size="lg"
          color="#4DB178"
          className="mb-2"
        >
          Iniciar sesión
        </Button>
      </div>
    </Form>
  );
};

export default UserCreateForm;
