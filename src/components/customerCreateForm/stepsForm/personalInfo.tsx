import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import { Button, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import styles from '../customerCreateForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { personalInfoSchema } from 'util/validations/customerShema';
import { yupResolver } from '@hookform/resolvers/yup';
import { QuestionCircleFill } from 'react-bootstrap-icons';
import DatePicker from 'react-datepicker';

interface PersonalInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}
const schema = yup.object().shape(personalInfoSchema);

const PersonalInfo: FC<PersonalInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  const navigate = useNavigate();
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
      name: '',
      lastname: '',
      document: '',
      birthdate: '',
      profession: '',
    },
  });

  const dateParse = field => {
    return field ? Date.parse(field) : null;
  };

  const onSubmit = async (dataForm: {
    name?: string;
    lastname?: string;
    document?: string;
    birthdate?: string;
    profession?: string;
  }) => {
    setCustomerData({
      ...customerData,
      name: dataForm.name || 'sas',
      lastname: dataForm.lastname || 'sas',
      document: dataForm.document || '342432',
      birthdate: dataForm.birthdate || 'dsad',
      profession: dataForm.profession || 'dsadad',
    });
    setStep(2);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.customerForm}>
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
          Fecha de nacimiento <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="birthdate"
          control={control}
          render={({ field }) => (
            <DatePicker
              placeholderText="Ingrese la fecha de nacimiento"
              dateFormat="dd-MM-yyyy"
              locale="es"
              selected={dateParse(field.value)}
              onChange={date => field.onChange(date)}
              maxDate={new Date()}
            />
          )}
        />
        {errors.birthdate?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.birthdate?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Profesión</Form.Label>
        <Form.Control
          {...register('profession')}
          type="text"
          placeholder={'Ingrese la profesión' || ''}
          isInvalid={!!errors.profession}
        />
        <Form.Control.Feedback type="invalid">{errors.profession?.message}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/app/customers`);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit">
          Siguiente
        </Button>
      </div>
    </Form>
  );
};

export default PersonalInfo;
