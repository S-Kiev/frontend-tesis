import { FC, useMemo, useState } from 'react';
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
import { useGetCustomers } from 'customHooks/useGetCustomers';
import { useGetTreatments } from 'customHooks/useGetTreatments';
import DatePicker from 'react-datepicker';
import '../../util/styles/datepicker.scss';

interface ConsultationsCreateFormProps {}

const schema = yup.object().shape(consultationSchema);

const ConsultationsCreateForm: FC<ConsultationsCreateFormProps> = () => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [treatments, setTreatments] = useState<any>();
  const { data: dataCustomers, isLoading: isLoadingCustomers } = useGetCustomers();
  const {
    data: dataTreatments,
    isLoading: isLoadingTreatments,
    equipments,
    consultingRooms,
  } = useGetTreatments(treatments);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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

  console.log(equipments);
  console.log(consultingRooms);

  const dateParse = (field): Date | null => {
    return field ? new Date(Date.parse(field)) : null;
  };

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
    equipments?: ({ value: string; label: string; show: boolean } | undefined)[] | null | undefined;
    consultingRooms: ({ value: string; label: string; show: boolean } | undefined)[];
    dateSinceConsultation: string;
    dateUntilConsultation: string;
    comments?: string;
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
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Cliente <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="customer"
          control={control}
          render={({ field }) => (
            <Select
              options={dataCustomers}
              isLoading={isLoadingCustomers}
              value={dataCustomers.find(c => c.value === field.value)}
              onChange={val => field.onChange(val.value)}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  borderColor: !!errors.customer ? '#dc3545' : '#dee2e6',
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
              name="customer"
              isDisabled={isLoadingCustomers}
              placeholder={'Seleccione un cliente'}
            />
          )}
        />
        {errors.customer?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.customer?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Tratamientos</Form.Label>
        <Controller
          name="treatments"
          control={control}
          render={({ field }) => (
            <Select
              options={dataTreatments}
              isOptionDisabled={option => option.show === false}
              isLoading={isLoadingTreatments}
              value={dataTreatments.find(c => c.value === field.value)}
              onChange={val => {
                setTreatments(val);
                field.onChange(val);
              }}
              styles={{
                control: baseStyles => ({
                  ...baseStyles,
                  borderColor: !!errors.treatments ? '#dc3545' : '#dee2e6',
                  borderRadius: '0.375rem',
                  fontSize: '14px',
                }),
              }}
              menuPlacement="auto"
              isSearchable
              isMulti
              noOptionsMessage={() => 'No hay opciones'}
              name="treatments"
              isDisabled={isLoadingTreatments}
              placeholder={'Seleccione tratamientos'}
            />
          )}
        />
        {errors.treatments?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.treatments?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Hora de inicio <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="dateSinceConsultation"
          control={control}
          render={({ field }) => (
            <DatePicker
              showIcon
              showMonthDropdown
              showTimeSelect
              placeholderText="Ingrese la fecha inicio"
              dateFormat="MMMM d, yyyy h:mm aa"
              locale="es"
              selected={dateParse(field?.value)}
              onChange={date => field.onChange(date)}
              minDate={new Date()}
              minTime={new Date()}
              maxTime={new Date(0, 0, 0, 23, 30)}
              wrapperClassName={errors.dateSinceConsultation?.message ? styles.datepickerError : styles.datepicker}
            />
          )}
        />
        {errors.dateSinceConsultation?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.dateSinceConsultation?.message}
            </span>
          </div>
        )}
      </Form.Group>

      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Hora de fin <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="dateUntilConsultation"
          control={control}
          render={({ field }) => (
            <DatePicker
              showIcon
              showMonthDropdown
              showTimeSelect
              placeholderText="Ingrese la fecha de fin"
              dateFormat="MMMM d, yyyy h:mm aa"
              locale="es"
              selected={dateParse(field?.value)}
              onChange={date => field.onChange(date)}
              minDate={new Date()}
              minTime={new Date()}
              maxTime={new Date(0, 0, 0, 23, 30)}
              wrapperClassName={errors.dateUntilConsultation?.message ? styles.datepickerError : styles.datepicker}
            />
          )}
        />
        {errors.dateUntilConsultation?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.dateUntilConsultation?.message}
            </span>
          </div>
        )}
      </Form.Group>

      <Form.Group className="form-outline mb-4">
        <Form.Label>Comentarios</Form.Label>
        <Form.Control
          {...register('comments')}
          as="textarea"
          rows={3}
          placeholder="Ingrese comentarios"
          isInvalid={!!errors.comments}
        />
        <Form.Control.Feedback type="invalid">{errors.comments?.message}</Form.Control.Feedback>
      </Form.Group>
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
        <Button variant="success" type="submit" disabled={isDisabled || !isValid}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Guardar</span>
        </Button>
      </div>
    </Form>
  );
};

export default ConsultationsCreateForm;
