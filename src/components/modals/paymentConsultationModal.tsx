import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { createPayment } from 'api/consultation';
import ErrorToast from 'components/toast/errorToast';
import SuccessToast from 'components/toast/successToast';
import { PaymentStatusEnum } from 'models/paymentStatus';
import { FC, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { CashCoin } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { paymentConsultationSchema } from 'util/validations/paymentConsultationSchema';
import * as yup from 'yup';

interface PaymentConsultationModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  consultatonId: number | string;
  customerId: number | string;
}

const schema = yup.object().shape(paymentConsultationSchema);

export const PaymentConsultationModal: FC<PaymentConsultationModalProps> = ({
  show,
  showModal,
  consultatonId,
  customerId,
}) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      totalCost: 0,
      customerPayment: 0,
    },
  });
  const queryClient = useQueryClient();

  const mutationCreatePayment = useMutation({
    mutationFn: createPayment,
    onSuccess: () => {
      toast(<SuccessToast message={`Pago registrado con éxito`} hour />, {
        style: { borderRadius: '10px' },
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.CustomersPaymentsByConsultation, consultatonId],
      });
      setIsDisabled(false);
      showModal(false);
    },
    onError: () => {
      toast(<ErrorToast message={`Ha ocurrido un error al registrar el pago, intente nuevamente`} />, {
        style: { borderRadius: '10px' },
      });
      setIsDisabled(false);
    },
  });

  const onSubmit = async (dataForm: { totalCost: number; customerPayment: number }) => {
    setIsDisabled(true);
    let status: PaymentStatusEnum = PaymentStatusEnum.pending;

    if (dataForm.totalCost === dataForm.customerPayment) {
      status = PaymentStatusEnum.total;
    }
    if (dataForm.totalCost > dataForm.customerPayment && dataForm.customerPayment !== 0) {
      status = PaymentStatusEnum.partial;
    }
    if (dataForm.customerPayment === 0) {
      status = PaymentStatusEnum.pending;
    }

    mutationCreatePayment.mutate({
      consultation: Number(consultatonId),
      customer: Number(customerId),
      totalCost: dataForm.totalCost,
      paid: dataForm.customerPayment,
      paymentStatus: status,
    });
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <CashCoin color="rgba(8, 135, 93, 1)" size={30} className="me-2" /> Registro de pago
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ margin: '10px 10px' }}>
            <Form.Group className="form-outline mb-4">
              <Form.Label>
                Costo total <strong className="text-danger me-2">*</strong>
              </Form.Label>
              <Form.Control
                {...register('totalCost')}
                type="number"
                placeholder="Ingrese el costo total"
                isInvalid={!!errors.totalCost}
              />
              <Form.Control.Feedback type="invalid">{errors.totalCost?.message}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="form-outline mb-4">
              <Form.Label>
                Cliente paga <strong className="text-danger me-2">*</strong>
              </Form.Label>
              <Form.Control
                {...register('customerPayment')}
                type="number"
                placeholder="Ingrese lo que paga el cliente"
                isInvalid={!!errors.customerPayment}
              />
              <Form.Control.Feedback type="invalid">{errors.customerPayment?.message}</Form.Control.Feedback>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px' }}>
              <Button
                variant="secondary"
                type="button"
                className="me-3"
                disabled={isDisabled}
                onClick={() => {
                  showModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button variant="success" type="submit" disabled={isDisabled}>
                {isDisabled && <Spinner className="me-1" size="sm" />}
                <span>Guardar</span>
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
