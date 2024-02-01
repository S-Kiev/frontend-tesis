import { FC, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button, Form, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './ObservationEditForm.module.scss';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { observationSchema } from 'util/validations/observationSchema';
import Switch from 'react-switch';
import { createMeasurements, editMeasurements, editObservation } from 'api/consultation';
import { toast } from 'react-toastify';
import SuccessToast from 'components/toast/successToast';
import ErrorToast from 'components/toast/errorToast';
import { uploadAttachmentObservations } from 'api/upload';
import { ConsultationObservation } from 'models/Observations';

interface ObservationEditFormProps {
  consultationId: number | string;
  observationData: ConsultationObservation;
  customerId: number | string;
}

const schema = yup.object().shape(observationSchema);

const ObservationEditForm: FC<ObservationEditFormProps> = ({ consultationId, observationData, customerId }) => {
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    getValues,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      observations: observationData ? observationData?.attributes?.observationsConsultation : '',
      images: null,
      measurements: observationData?.attributes?.measurements?.data?.id ? true : false,
      highWaist: observationData ? observationData?.attributes?.measurements?.data?.attributes?.highWaist : undefined,
      mean: observationData ? observationData?.attributes?.measurements?.data?.attributes?.mean : undefined,
      navelLine: observationData ? observationData?.attributes?.measurements?.data?.attributes?.navelLine : undefined,
      lowerBelly: observationData ? observationData?.attributes?.measurements?.data?.attributes?.lowerBelly : undefined,
    },
  });

  const mutationEditMesurmenets = useMutation({
    mutationFn: editMeasurements,
    onSuccess: (data: any) => {
      mutationEditObservations.mutate({
        observationId: Number(observationData?.id),
        observationsConsultation: getValues().observations || '',
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar las observaciones, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationCreateMesurmenets = useMutation({
    mutationFn: createMeasurements,
    onSuccess: (data: any) => {
      const measurementsId: number = data?.data?.data?.id;
      mutationEditObservations.mutate({
        observationId: Number(observationData?.id),
        observationsConsultation: getValues().observations || '',
        measurements: measurementsId,
      });
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar las observaciones, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationEditObservations = useMutation({
    mutationFn: editObservation,
    onSuccess: (data: any) => {
      const observationId: number = data?.data?.data?.id;
      const files: any = getValues().images;

      if (files) {
        for (let index = 0; index < files.length; index++) {
          const element = files[index];
          mutationUploadImagesObservation.mutate({
            id: observationId.toString(),
            attachments: element,
          });
        }
      } else {
        toast(<SuccessToast message={`Observaciones editadas con éxito`} hour />, {
          style: { borderRadius: '10px' },
        });
        setIsDisabled(false);
        navigate(`/app/consultations/${consultationId}`);
      }
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al editar las observaciones, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const mutationUploadImagesObservation = useMutation({
    mutationFn: uploadAttachmentObservations,
    onSuccess: () => {
      toast(<SuccessToast message={`Observaciones registradas con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
      navigate(`/app/consultations/${consultationId}`);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar las observaciones, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: {
    observations?: string;
    images?: any;
    measurements: boolean;
    highWaist?: number | null | undefined;
    mean?: number | null | undefined;
    navelLine?: number | null | undefined;
    lowerBelly?: number | null | undefined;
  }) => {
    setIsDisabled(true);
    if (dataForm.measurements && observationData?.attributes?.measurements?.data?.id) {
      mutationEditMesurmenets.mutate({
        measurementsId: Number(observationData?.attributes?.measurements?.data?.id),
        highWaist: dataForm?.highWaist,
        mean: dataForm?.mean,
        navelLine: dataForm?.navelLine,
        lowerBelly: dataForm?.lowerBelly,
      });
    }
    if (dataForm.measurements && !observationData?.attributes?.measurements?.data?.id) {
      mutationCreateMesurmenets.mutate({
        consultation: Number(consultationId),
        customer: Number(customerId),
        highWaist: dataForm?.highWaist,
        mean: dataForm?.mean,
        navelLine: dataForm?.navelLine,
        lowerBelly: dataForm?.lowerBelly,
      });
    }
    if (dataForm.measurements === false) {
      mutationEditObservations.mutate({
        observationId: Number(observationData?.id),
        observationsConsultation: dataForm?.observations || '',
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <Form.Group className="form-outline mb-4">
        <Form.Label>Observaciones</Form.Label>
        <Form.Control
          {...register('observations')}
          as="textarea"
          rows={3}
          placeholder={'Ingrese una descripción' || ''}
          isInvalid={!!errors.observations}
        />
        <Form.Control.Feedback type="invalid">{errors.observations?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-4">
        <Form.Label>Imagenes</Form.Label>
        <Form.Control type="file" multiple {...register('images')} accept="image/png, .jpeg, .jpg," />
        <Form.Control.Feedback type="invalid">{errors.images?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="d-flex align-items-center mb-4">
        <Form.Label className="mb-0 ms-2 me-2">Agregar medidas</Form.Label>
        <Controller
          name="measurements"
          control={control}
          render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
        />
      </Form.Group>
      {watch('measurements') && (
        <>
          <Form.Group className="form-outline mb-4">
            <Form.Label>Cintura alta</Form.Label>
            <Form.Control
              {...register('highWaist')}
              type="number"
              placeholder="Ingrese la medida"
              isInvalid={!!errors.highWaist}
            />
            <Form.Control.Feedback type="invalid">{errors.highWaist?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-outline mb-4">
            <Form.Label>Cintura media</Form.Label>
            <Form.Control
              {...register('mean')}
              type="number"
              placeholder="Ingrese la medida"
              isInvalid={!!errors.mean}
            />
            <Form.Control.Feedback type="invalid">{errors.mean?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-outline mb-4">
            <Form.Label>Línea de ombligo</Form.Label>
            <Form.Control
              {...register('navelLine')}
              type="number"
              placeholder="Ingrese la medida"
              isInvalid={!!errors.navelLine}
            />
            <Form.Control.Feedback type="invalid">{errors.navelLine?.message}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="form-outline mb-4">
            <Form.Label>Vientre bajo</Form.Label>
            <Form.Control
              {...register('lowerBelly')}
              type="number"
              placeholder="Ingrese la medida"
              isInvalid={!!errors.lowerBelly}
            />
            <Form.Control.Feedback type="invalid">{errors.lowerBelly?.message}</Form.Control.Feedback>
          </Form.Group>
        </>
      )}
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/app/consultations/${consultationId}`);
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

export default ObservationEditForm;
