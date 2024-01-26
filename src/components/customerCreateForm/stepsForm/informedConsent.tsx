import { CustomerCreateData } from 'models/Customer';
import { FC, useState } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { informedConsentSchema } from 'util/validations/customerShema';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Alert, Button, Form, Spinner } from 'react-bootstrap';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import FileUploader from 'components/fileUploader/fileUploader';
import { toast } from 'react-toastify';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { createCustomerMedicalInfo, createCustomerPersonalInfo } from 'api/customers';
import { uploadAttachmentInformedConsent } from 'api/upload';

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
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    getValues,
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      informedConsent: customerData.informedConsent,
    },
  });

  const mutationCustomerPersonalInfo = useMutation({
    mutationFn: createCustomerPersonalInfo,
    onSuccess: (data: any) => {
      const customerId: number = data?.data?.data?.id;
      mutationCustomerMedicalInfo.mutate({
        customer: customerId,
        medication: customerData.medication,
        doctor: customerData.doctor,
        emergencyPhone: customerData.emergencyPhone,
        suffersIllness: customerData.suffersIllness,
        columnProblem: customerData.columnProblem,
        operation: customerData.operation,
        heartProblem: customerData.heartProblem,
        cancer: customerData.cancer,
        diu: customerData.diu,
        metalImplants: customerData.metalImplants,
        hypertensive: customerData.hypertensive,
        varicoseVeins: customerData.varicoseVeins,
        coagulationProblems: customerData.coagulationProblems,
        comments: customerData.comments,
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el cliente, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationCustomerMedicalInfo = useMutation({
    mutationFn: createCustomerMedicalInfo,
    onSuccess: (data: any) => {
      const customerMedicalInfoId: number = data?.data?.data?.id;
      const informedConsentFile: any = getValues().informedConsent;
      if (informedConsentFile) {
        mutationUploadInformedConsent.mutate({
          id: customerMedicalInfoId.toString(),
          attachment: informedConsentFile,
        });
      } else {
        toast(<SuccessToast message={`Cliente registrado con éxito`} hour />, {
          style: { borderRadius: '10px' },
        });
        setIsDisabled(false);
        navigate(`/app/customers`);
      }
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el cliente, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationUploadInformedConsent = useMutation({
    mutationFn: uploadAttachmentInformedConsent,
    onSuccess: () => {
      toast(<SuccessToast message={`Cliente registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/customers`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el cliente, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { informedConsent?: any }) => {
    setCustomerData({
      ...customerData,
      informedConsent: dataForm.informedConsent || null,
    });
    setIsDisabled(true);
    mutationCustomerPersonalInfo.mutate({
      name: customerData.name,
      lastname: customerData.lastname,
      document: customerData.document,
      birthdate: customerData?.birthdate ? new Date(customerData.birthdate).toISOString() : '',
      cellphone: customerData.cellphone,
      email: customerData.email || '',
      city: customerData.city || '',
      address: customerData.address,
      howDidYouKnow: customerData.howDidYouKnow,
      profession: customerData.profession,
      reasonFirstVisit: customerData.reasonFirstVisit || '',
    });
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
      <Form.Group className="form-outline mb-4">
        <Form.Label>Consentimiento informado</Form.Label>
        <Controller
          name="informedConsent"
          control={control}
          render={({ field }) => (
            <FileUploader
              acceptTypes={{
                'application/pdf': ['.pdf'],
                'image/jpeg': ['.jpeg', '.jpg'],
                'image/png': ['.png'],
              }}
              fileUploaded={field.value}
              onFileChange={field.onChange}
              error={errors.informedConsent ? errors.informedConsent?.message?.toString() : false}
              customId="informed-consent-upload"
            />
          )}
        />
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
              informedConsent: data.informedConsent,
            });
            setStep(3);
          }}
        >
          Atrás
        </Button>
        <Button variant="success" type="submit" disabled={isDisabled}>
          {isDisabled && <Spinner className="me-1" size="sm" />}
          <span>Finalizar</span>
        </Button>
      </div>
    </Form>
  );
};

export default InformedConsent;
