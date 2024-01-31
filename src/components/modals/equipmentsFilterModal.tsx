import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Funnel } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Switch from 'react-switch';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

interface EquipmentsFilterModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  setFilters: (state: any) => void;
  filters: any;
}

const schema = yup.object().shape({
  available: yup.boolean().required(),
  occupied: yup.boolean().required(),
  rented: yup.boolean().required(),
  broken: yup.boolean().required(),
  outOfUse: yup.boolean().required(),
});

export const EquipmentsFilterModal: FC<EquipmentsFilterModalProps> = ({ show, showModal, setFilters, filters }) => {
  const { handleSubmit, control } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      available: filters.available,
      occupied: filters.occupied,
      rented: filters.rented,
      broken: filters.broken,
      outOfUse: filters.outOfUse,
    },
  });

  const onSubmit = async (dataForm: {
    available: boolean;
    occupied: boolean;
    rented: boolean;
    broken: boolean;
    outOfUse: boolean;
  }) => {
    setFilters({
      available: dataForm.available,
      occupied: dataForm.occupied,
      rented: dataForm.rented,
      broken: dataForm.broken,
      outOfUse: dataForm.outOfUse,
    });
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Funnel color="rgba(8, 135, 93, 1)" size={30} className="me-2" /> Filtros equipos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
            <Form.Group className="d-flex align-items-center mb-4">
              <Controller
                name="available"
                control={control}
                render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
              />
              <Form.Label className="mb-0 ms-2">Disponible</Form.Label>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mb-4">
              <Controller
                name="occupied"
                control={control}
                render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
              />
              <Form.Label className="mb-0 ms-2">Ocupado</Form.Label>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mb-4">
              <Controller
                name="rented"
                control={control}
                render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
              />
              <Form.Label className="mb-0 ms-2">Alquilado</Form.Label>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mb-4">
              <Controller
                name="broken"
                control={control}
                render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
              />
              <Form.Label className="mb-0 ms-2">Averiado</Form.Label>
            </Form.Group>
            <Form.Group className="d-flex align-items-center mb-4">
              <Controller
                name="outOfUse"
                control={control}
                render={({ field }) => <Switch onChange={value => field.onChange(value)} checked={field.value} />}
              />
              <Form.Label className="mb-0 ms-2">Fuera de uso</Form.Label>
            </Form.Group>
            <div className="d-flex align-items-center justify-content-end" style={{ marginTop: '30px' }}>
              <Button
                variant="secondary"
                type="button"
                className="me-3"
                onClick={() => {
                  showModal(false);
                }}
              >
                Cancelar
              </Button>
              <Button variant="success" type="submit">
                Filtrar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};
