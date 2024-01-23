import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { medicalInfoSchema } from 'util/validations/customerShema';
import { Alert, Button, Form } from 'react-bootstrap';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Switch from 'react-switch';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';

interface MedicalInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
  alertMedicalInfo: boolean;
  setAlertMedicalInfo: (state: boolean) => void;
}

const schema = yup.object().shape(medicalInfoSchema);

const MedicalInfo: FC<MedicalInfoProps> = ({
  setStep,
  customerData,
  setCustomerData,
  alertMedicalInfo,
  setAlertMedicalInfo,
}) => {
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
      reasonFirstVisit: customerData.reasonFirstVisit,
      medication: customerData.medication,
      doctor: customerData.doctor,
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
    },
  });

  const onSubmit = async (dataForm: {
    reasonFirstVisit?: string;
    medication?: string;
    doctor?: string;
    suffersIllness?: string;
    columnProblem?: boolean;
    operation?: string;
    heartProblem?: boolean;
    cancer?: string;
    diu?: boolean;
    metalImplants?: boolean;
    hypertensive?: boolean;
    varicoseVeins?: boolean;
    coagulationProblems?: boolean;
    comments?: string;
  }) => {
    setCustomerData({
      ...customerData,
      reasonFirstVisit: dataForm.reasonFirstVisit || '',
      medication: dataForm.medication || '',
      doctor: dataForm.doctor || '',
      suffersIllness: dataForm.suffersIllness || '',
      columnProblem: dataForm.columnProblem || false,
      operation: dataForm.operation || '',
      heartProblem: dataForm.heartProblem || false,
      cancer: dataForm.cancer || '',
      diu: dataForm.diu || false,
      metalImplants: dataForm.metalImplants || false,
      hypertensive: dataForm.hypertensive || false,
      varicoseVeins: dataForm.varicoseVeins || false,
      coagulationProblems: dataForm.coagulationProblems || false,
      comments: dataForm.comments || '',
    });
    setStep(4);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.customerForm}>
      {alertMedicalInfo && (
        <Alert variant="warning" onClose={() => setAlertMedicalInfo(false)} dismissible>
          <Alert.Heading className="d-flex align-items-center">
            <ExclamationTriangleFill className="me-2" /> Cuidado
          </Alert.Heading>
          <p>
            Ningún dato de esta sección es requerido para avanzar en el alta del cliente. Pero{' '}
            <strong>a pesar de no ser datos obligatorios se recomienda su ingreso</strong> de ser posible ahora, sino
            recordar hacerlo luego ya que son datos importantes del mismo.
          </p>
        </Alert>
      )}
      <Form.Group className="form-outline mb-4">
        <Form.Label>Razón de la primera visita</Form.Label>
        <Form.Control
          {...register('reasonFirstVisit')}
          as="textarea"
          rows={2}
          placeholder="Ingrese la razón"
          isInvalid={!!errors.reasonFirstVisit}
        />
        <Form.Control.Feedback type="invalid">{errors.reasonFirstVisit?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Medicación</Form.Label>
        <Form.Control
          {...register('medication')}
          as="textarea"
          rows={2}
          placeholder={'Ingrese la medicación' || ''}
          isInvalid={!!errors.medication}
        />
        <Form.Control.Feedback type="invalid">{errors.medication?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Doctor</Form.Label>
        <Form.Control {...register('doctor')} type="text" placeholder="Ingrese el doctor" isInvalid={!!errors.doctor} />
        <Form.Control.Feedback type="invalid">{errors.doctor?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Padece alguna enfermedad</Form.Label>
        <Form.Control
          {...register('suffersIllness')}
          as="textarea"
          rows={2}
          placeholder="Ingrese si padece alguna enfermedad"
          isInvalid={!!errors.suffersIllness}
        />
        <Form.Control.Feedback type="invalid">{errors.suffersIllness?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="columnProblem"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Problemas de columna</Form.Label>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Operaciones</Form.Label>
        <Form.Control
          {...register('operation')}
          as="textarea"
          rows={2}
          placeholder="Ingrese si ha tenido operaciones"
          isInvalid={!!errors.operation}
        />
        <Form.Control.Feedback type="invalid">{errors.operation?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="heartProblem"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Problemas cardiacos</Form.Label>
      </Form.Group>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Cancer</Form.Label>
        <Form.Control
          {...register('cancer')}
          as="textarea"
          rows={2}
          placeholder="Ingrese si ha tenido cancer"
          isInvalid={!!errors.cancer}
        />
        <Form.Control.Feedback type="invalid">{errors.cancer?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="diu"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">DIU</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="metalImplants"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Implantes metálicos</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="hypertensive"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Es hipertenso</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="varicoseVeins"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Varices</Form.Label>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Controller
          name="coagulationProblems"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
        <Form.Label className="mb-0 ms-2">Problemas de coagulación</Form.Label>
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
            const data = getValues();
            setCustomerData({
              ...customerData,
              reasonFirstVisit: data.reasonFirstVisit || '',
              medication: data.medication || '',
              doctor: data.doctor || '',
              suffersIllness: data.suffersIllness || '',
              columnProblem: data.columnProblem || false,
              operation: data.operation || '',
              heartProblem: data.heartProblem || false,
              cancer: data.cancer || '',
              diu: data.diu || false,
              metalImplants: data.metalImplants || false,
              hypertensive: data.hypertensive || false,
              varicoseVeins: data.varicoseVeins || false,
              coagulationProblems: data.coagulationProblems || false,
              comments: data.comments || '',
            });
            setStep(2);
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

export default MedicalInfo;
