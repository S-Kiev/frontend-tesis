import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, OverlayTrigger, Spinner, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './userEditForm.module.scss';
import { QuestionCircleFill } from 'react-bootstrap-icons';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Select from 'react-select';
import { useGetCities } from 'customHooks/useGetCities';
import PhoneInput from 'react-phone-number-input';
import '../../util/styles/phoneNumberInput.scss';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { UserDataGet, UserGet } from 'models/User';
import { userEditSchema } from 'util/validations/userEditSchema';
import { editUser, editUserData } from 'api/users';

interface UserEditFormProps {
  user: UserGet;
  userData: UserDataGet;
  userId: string;
}

const schema = yup.object().shape(userEditSchema);

const UserEditForm: FC<UserEditFormProps> = ({ user, userData, userId }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const { data: dataCities, isLoading: isLoadingCities } = useGetCities();
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
      username: user.username,
      email: user.email,
      name: userData.name,
      lastname: userData.lastname,
      document: userData.document,
      cellphone: userData.cellphone,
      city: userData.city.data.id,
      address: userData.address,
    },
  });

  const mutationUser = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      const userData: any = getValues();
      mutationUserData.mutate({
        name: userData.name,
        lastname: userData.lastname,
        document: userData.document,
        cellphone: userData.cellphone,
        city: userData.city,
        address: userData.address,
        userId: userId,
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar el usuario, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationUserData = useMutation({
    mutationFn: editUserData,
    onSuccess: () => {
      toast(<SuccessToast message={`Usuario editado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/user/${userId}`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar el usuario, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: {
    username: string;
    email: string;
    name: string;
    lastname: string;
    document: string;
    cellphone: string;
    city: number;
    address: string;
  }) => {
    setIsDisabled(true);
    if (user.username !== dataForm.username || user.email !== dataForm.email) {
      mutationUser.mutate({
        username: dataForm.username,
        email: dataForm.email,
        userId: userId,
      });
    } else {
      mutationUserData.mutate({
        name: dataForm.name,
        lastname: dataForm.lastname,
        document: dataForm.document,
        cellphone: dataForm.cellphone,
        city: dataForm.city,
        address: dataForm.address,
        userId: userId,
      });
    }
  };

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
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type="invalid">{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
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
          Apellido <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Form.Control
          {...register('lastname')}
          type="text"
          placeholder={'Ingrese el apellido' || ''}
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
          isInvalid={!!errors.document}
        />
        <Form.Control.Feedback type="invalid">{errors.document?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Celular <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="cellphone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              placeholder="Ingrese el numero de celular"
              value={field.value}
              onChange={value => field.onChange(value)}
              international
              countryCallingCodeEditable={false}
              className={!!errors.cellphone ? 'inputPhoneNumberError' : 'inputPhoneNumber'}
            />
          )}
        />
        {errors.cellphone?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.cellphone?.message}
            </span>
          </div>
        )}
      </Form.Group>

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
              isSearchable
              noOptionsMessage={() => 'No hay opciones'}
              name="city"
              isDisabled={isLoadingCities}
              placeholder={'Seleccione una ciudad/localidad'}
            />
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
          isInvalid={!!errors.address}
        />
        <Form.Control.Feedback type="invalid">{errors.address?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(-1);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit" disabled={isDisabled}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Guardar cambios</span>
        </Button>
      </div>
    </Form>
  );
};

export default UserEditForm;
