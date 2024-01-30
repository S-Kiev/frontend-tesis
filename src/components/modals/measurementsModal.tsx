import TableHeader from 'components/tableHeader/tableHeader';
import { format } from 'date-fns';
import { CustomerMeasurementsData } from 'models/CustomerMeasurements';
import { FC } from 'react';
import { Alert, Table } from 'react-bootstrap';
import { ExclamationTriangleFill, Rulers } from 'react-bootstrap-icons';
import Modal from 'react-bootstrap/Modal';

interface MeasurementsModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
  customerMesurements: CustomerMeasurementsData[];
}

export const MeasurementsModal: FC<MeasurementsModalProps> = ({ show, showModal, customerMesurements }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Fecha', col: 0 },
    { title: 'Cintura alta', col: 1 },
    { title: 'Cintura media', col: 2 },
    { title: 'Línea de ombligo', col: 3 },
    { title: 'Vientre bajo', col: 4 },
  ];
  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>
            <Rulers color="rgba(8, 135, 93, 1)" /> Resumen de medidas
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {customerMesurements?.length === 0 ? (
            <Alert variant="warning" className="mt-2">
              <div className="d-flex align-items-center">
                <ExclamationTriangleFill className="me-2" /> Este cliente no tiene medidas registradas
              </div>
            </Alert>
          ) : (
            <Table responsive="md">
              <TableHeader headersList={headersList} />
              <tbody>
                {customerMesurements?.map(element => (
                  <tr>
                    <td>
                      <p>{`${
                        element?.attributes?.consultation?.data?.attributes?.since
                          ? format(new Date(element?.attributes?.consultation?.data?.attributes?.since), 'dd-MM-yyyy')
                          : '---'
                      }`}</p>
                    </td>
                    <td>
                      <p>{element?.attributes?.highWaist}</p>
                    </td>
                    <td>
                      <p>{element?.attributes?.mean}</p>
                    </td>
                    <td>
                      <p>{element?.attributes?.navelLine}</p>
                    </td>
                    <td>
                      <p>{element?.attributes?.lowerBelly}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};
