import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { informedConsentSchema } from 'util/validations/customerShema';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Form } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

interface InformedConsentProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
  alertInformedConsent: boolean;
  setAlertInformedConsent: (state: boolean) => void;
}

const schema = yup.object().shape(informedConsentSchema);

const InformedConsent: FC<InformedConsentProps> = ({
  setStep,
  customerData,
  setCustomerData,
  alertInformedConsent,
  setAlertInformedConsent,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      informedConsent: customerData.informedConsent,
    },
  });

  const onSubmit = async (dataForm: { informedConsent?: any }) => {
    setCustomerData({
      ...customerData,
      informedConsent: dataForm.informedConsent || null,
    });
    //Subidas y guardados api
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.customerForm}>
      {alertInformedConsent && (
        <Alert variant="warning" onClose={() => setAlertInformedConsent(false)} dismissible>
          <Alert.Heading className="d-flex align-items-center">
            <ExclamationTriangleFill className="me-2" /> Cuidado
          </Alert.Heading>
          <p>
            El consentimiento informado no es requerido para finalizar el alta del cliente. Pero
            <strong>a pesar de no ser obligatorio se recomienda su ingreso</strong> de ser posible ahora, sino recordar
            hacerlo luego ya que es <strong>importante</strong>.
          </p>
        </Alert>
      )}
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            const data = getValues();
            setCustomerData({
              ...customerData,
              informedConsent: data.informedConsent,
            });
            setStep(3);
          }}
        >
          Atrás
        </Button>
        <Button variant="success" type="submit">
          Finalizar
        </Button>
      </div>
    </Form>
  );
};

export default InformedConsent;
