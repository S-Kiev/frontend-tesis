import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { Funnel } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EquipmentStatusEnum } from 'models/EquipmentStatus';

interface EquipmentsFilterModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  setFilter: (state: any) => void;
  filter: any;
}

const schema = yup.object().shape({
  filterSelect: yup.string().nullable(),
});

export const EquipmentsFilterModal: FC<EquipmentsFilterModalProps> = ({ show, showModal, setFilter, filter }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      filterSelect: filter.name,
    },
  });

  const options = [
    { value: null, label: 'Ninguno' },
    { value: EquipmentStatusEnum.available, label: 'Disponible' },
    { value: EquipmentStatusEnum.broken, label: 'Averiado' },
    { value: EquipmentStatusEnum.occupied, label: 'Ocupado' },
    { value: EquipmentStatusEnum.outOfUse, label: 'Fuera de uso' },
    { value: EquipmentStatusEnum.rented, label: 'Alquilado' },
  ];

  const onSubmit = async (dataForm: { filterSelect?: string | null }) => {
    setFilter({
      name: dataForm?.filterSelect,
    });
    showModal(false);
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <Funnel color="rgba(8, 135, 93, 1)" size={30} className="me-2" /> Filtros Equipos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: '20px' }}>
            <Form.Group className="form-outline mb-4">
              <Form.Label>
                Filtrar por estado <strong className="text-danger me-2">*</strong>
              </Form.Label>
              <Controller
                name="filterSelect"
                control={control}
                render={({ field }) => (
                  <Select
                    options={options}
                    value={options.find(o => o.value === field.value)}
                    onChange={val => field.onChange(val?.value)}
                    styles={{
                      control: baseStyles => ({
                        ...baseStyles,
                        borderColor: !!filter.filterSelect ? '#dc3545' : '#dee2e6',
                        borderRadius: '0.375rem',
                        visibility: 'visible',
                        height: '40px',
                        fontSize: '14px',
                        alignContent: 'center',
                      }),
                    }}
                    menuPlacement="auto"
                    isSearchable={false}
                    name="filterSelect"
                    placeholder={'Seleccione un filtro'}
                  />
                )}
              />
              {errors.filterSelect?.message && (
                <div className="d-flex align-items-center">
                  <span className="text-danger mt-1 ms-2" style={{ fontSize: '0.875em' }}>
                    {errors.filterSelect?.message && 'Este campo es requerido'}
                  </span>
                </div>
              )}
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
