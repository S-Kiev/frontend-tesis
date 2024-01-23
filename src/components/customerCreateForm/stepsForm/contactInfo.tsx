import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { contactInfoSchema } from 'util/validations/customerShema';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form } from 'react-bootstrap';
import { yupResolver } from '@hookform/resolvers/yup';
import PhoneInput from 'react-phone-number-input';
import '../../../util/styles/phoneNumberInput.scss';
import Select from 'react-select';
import { useGetCities } from 'customHooks/useGetCities';
import { didYouKnow } from 'models/didYouKnow';

interface ContactInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const schema = yup.object().shape(contactInfoSchema);

const ContactInfo: FC<ContactInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  const { data: dataCities, isLoading: isLoadingCities } = useGetCities();
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
      cellphone: customerData.cellphone,
      email: customerData.email,
      city: customerData.city,
      address: customerData.address,
      emergencyPhone: customerData.emergencyPhone,
      howDidYouKnow: customerData.howDidYouKnow,
    },
  });

  const onSubmit = async (dataForm: {
    cellphone: string;
    email?: string;
    city: number;
    address: string;
    emergencyPhone: string;
    howDidYouKnow: string;
  }) => {
    setCustomerData({
      ...customerData,
      cellphone: dataForm.cellphone.slice(1, -1),
      email: dataForm.email || '',
      city: dataForm.city,
      address: dataForm.address,
      emergencyPhone: dataForm.emergencyPhone.slice(1, -1),
      howDidYouKnow: dataForm.howDidYouKnow,
    });
    setStep(3);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.customerForm}>
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
              defaultCountry="UY"
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
        <Form.Label>Email</Form.Label>
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
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          Celular de emergencia <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="emergencyPhone"
          control={control}
          render={({ field }) => (
            <PhoneInput
              placeholder="Ingrese un celular de emergencia"
              value={field.value}
              onChange={value => field.onChange(value)}
              defaultCountry="UY"
              international
              countryCallingCodeEditable={false}
              className={!!errors.cellphone ? 'inputPhoneNumberError' : 'inputPhoneNumber'}
            />
          )}
        />
        {errors.emergencyPhone?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.emergencyPhone?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>
          ¿Cómo supo de nosotros? <strong className="text-danger me-2">*</strong>
        </Form.Label>
        <Controller
          name="howDidYouKnow"
          control={control}
          render={({ field }) => (
            <Select
              options={didYouKnow}
              value={didYouKnow.find(o => o.value === field.value)}
              onChange={val => field.onChange(val?.value)}
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
              name="howDidYouKnow"
              placeholder={'Seleccione una opción'}
            />
          )}
        />
        {errors.howDidYouKnow?.message && (
          <div className="d-flex align-items-center">
            <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
              {errors.howDidYouKnow?.message}
            </span>
          </div>
        )}
      </Form.Group>
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            const data = getValues();
            setCustomerData({
              ...customerData,
              cellphone: data.cellphone.slice(1, -1),
              email: data.email || '',
              city: data.city,
              address: data.address,
              emergencyPhone: data.emergencyPhone.slice(1, -1),
              howDidYouKnow: data.howDidYouKnow,
            });
            setStep(1);
          }}
        >
          Atrás
        </Button>
        <Button variant="success" type="submit">
          Siguiente
        </Button>
      </div>
    </Form>
  );
};

export default ContactInfo;
