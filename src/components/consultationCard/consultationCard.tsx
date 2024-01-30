import { FC } from 'react';
import { Accordion, Card, Table } from 'react-bootstrap';
import styles from './consultationCard.module.scss';
import { format } from 'date-fns';
import { ConsultationGetDataView } from 'models/Consultation';
import { CircleFill } from 'react-bootstrap-icons';
import { ConsultingRoomHistoryItem } from 'models/ConsultingRoomHistory';
import ConsultationStatus from 'components/consultationStatus/consultationStatus';
import './../customerInfo/accordion.css';
import { ConsultationObservation } from 'models/Observations';
import ModalImage from 'react-modal-image';
import TableHeader from 'components/tableHeader/tableHeader';
import { CustomerPayment } from 'models/CustomerPayment';
import { PaymentStatusEnum } from 'models/paymentStatus';
import PaymentStatus from 'components/paymentStatus/paymentStatus';

interface ConsultationCardProps {
  data: ConsultationGetDataView;
  dataConsultingRooms: ConsultingRoomHistoryItem[];
  observations: ConsultationObservation;
  paymentData: CustomerPayment;
}

const ConsultationCard: FC<ConsultationCardProps> = ({ data, dataConsultingRooms, observations, paymentData }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Fecha', col: 0 },
    { title: 'Cintura alta', col: 1 },
    { title: 'Cintura media', col: 2 },
    { title: 'Línea de ombligo', col: 3 },
    { title: 'Vientre bajo', col: 4 },
  ];

  return (
    <>
      <div className={styles.conteiner}>
        <Accordion alwaysOpen defaultActiveKey="0">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Información consulta</Accordion.Header>
            <Accordion.Body>
              <div className="mb-3 d-flex align-items-center">
                <strong className="me-2">Estado:</strong>
                <ConsultationStatus status={data?.status} />
              </div>
              <div className={styles.text}>
                <strong>Cliente:</strong>
                <p>{`${data?.customer?.data?.attributes?.name || '---'} ${
                  data?.customer?.data?.attributes?.lastname || '---'
                }`}</p>
              </div>
              <strong>Tratamientos:</strong>
              <div className="mt-2">
                {data?.treatments?.data?.map(item => {
                  return (
                    <>
                      <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                        <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                        <p>{item?.attributes?.name || '---'}</p>
                      </Card.Text>
                    </>
                  );
                })}
              </div>
              <strong>Equipamiento:</strong>
              <div className="mt-2">
                {data?.equipments?.length > 0 ? (
                  data?.equipments?.map(item => {
                    return (
                      <>
                        <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                          <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                          <p>{item?.attributes?.name || '---'}</p>
                        </Card.Text>
                      </>
                    );
                  })
                ) : (
                  <>
                    <Card.Text className="mb-3">
                      <p>No lleva equipamiento</p>
                    </Card.Text>
                  </>
                )}
              </div>
              <strong>Consultorios:</strong>
              <div className="mt-2">
                {data?.consultingRooms?.map(item => {
                  return (
                    <>
                      <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                        <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                        <p>{item?.attributes?.name || '---'}</p>
                      </Card.Text>
                    </>
                  );
                })}
              </div>
              <div className={styles.text}>
                <strong>Hora de comienzo de la consulta:</strong>
                <p>{data?.since ? format(new Date(data?.since), 'dd.MM.yyyy HH:mm') + 'hs' : '---'}</p>
              </div>
              <div className={styles.text}>
                <strong>Hora de fin de la consulta:</strong>
                <p>{data?.until ? format(new Date(data?.until), 'dd.MM.yyyy HH:mm') + 'hs' : '---'}</p>
              </div>
              {dataConsultingRooms?.length > 2 && (
                <>
                  <strong className={`mb-2`}>Horas consultorios:</strong>
                  <div className="mt-2">
                    {dataConsultingRooms?.map(item => {
                      return (
                        <>
                          <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                            <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                            <p>
                              <strong>{item?.attributes?.consulting_room?.data?.attributes?.name || '---'}</strong>
                              {` de ${
                                item.attributes?.since
                                  ? format(new Date(item.attributes?.since), 'HH:mm') + 'hs'
                                  : '---'
                              } hasta ${
                                item.attributes?.until
                                  ? format(new Date(item.attributes?.until), 'HH:mm') + 'hs'
                                  : '---'
                              }`}
                            </p>
                          </Card.Text>
                        </>
                      );
                    })}
                  </div>
                </>
              )}
              <div className={styles.text}>
                <strong>Comentarios:</strong>
                <p>{data?.comments || '---'}</p>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          {observations?.id && (
            <Accordion.Item eventKey="1">
              <Accordion.Header>Observaciones de la consulta</Accordion.Header>
              <Accordion.Body>
                <div className={styles.text}>
                  <strong>Observaciones:</strong>
                  <p>{observations?.attributes?.observationsConsultation || '---'}</p>
                </div>
                {observations?.attributes?.images && (
                  <>
                    <strong>Imagenes:</strong>
                    <div className={styles.images}>
                      {observations?.attributes?.images?.data?.map(item => {
                        return (
                          <div className={`mt-3`}>
                            <ModalImage
                              small={
                                item?.attributes?.formats?.small?.url
                                  ? item?.attributes?.formats?.small?.url
                                  : item?.attributes?.formats?.thumbnail?.url
                              }
                              medium={
                                item?.attributes?.formats?.medium?.url
                                  ? item?.attributes?.formats?.medium?.url
                                  : item?.attributes?.formats?.small?.url
                                  ? item?.attributes?.formats?.small?.url
                                  : item?.attributes?.formats?.thumbnail?.url
                              }
                              large={item?.attributes?.formats?.large?.url}
                              alt={item?.attributes?.name || 'image'}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                {observations?.attributes?.measurements && (
                  <>
                    <div className="mt-3">
                      <strong>Medidas:</strong>
                    </div>
                    <Table responsive="md">
                      <TableHeader headersList={headersList} />
                      <tbody>
                        <tr>
                          <td>
                            <p>{`${
                              observations?.attributes?.consultation?.data?.attributes?.since
                                ? format(
                                    new Date(observations?.attributes?.consultation?.data?.attributes?.since),
                                    'dd-MM-yyyy',
                                  )
                                : '---'
                            }`}</p>
                          </td>
                          <td>
                            <p>{observations?.attributes?.measurements?.data?.attributes?.highWaist}</p>
                          </td>
                          <td>
                            <p>{observations?.attributes?.measurements?.data?.attributes?.mean}</p>
                          </td>
                          <td>
                            <p>{observations?.attributes?.measurements?.data?.attributes?.navelLine}</p>
                          </td>
                          <td>
                            <p>{observations?.attributes?.measurements?.data?.attributes?.lowerBelly}</p>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </>
                )}
              </Accordion.Body>
            </Accordion.Item>
          )}
          {paymentData?.id && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Información sobre pagos</Accordion.Header>
              <Accordion.Body>
                <div className={styles.text}>
                  <strong>Costo total:</strong>
                  <p>{`$${paymentData?.attributes?.totalCost || '---'}`}</p>
                </div>
                {paymentData?.attributes?.paymentStatus !== PaymentStatusEnum.total && (
                  <div className={styles.text}>
                    <strong>Cliente pagó:</strong>
                    <p>{`$${paymentData?.attributes?.paid || '---'}`}</p>
                  </div>
                )}
                <div className={styles.text}>
                  <strong>Estado:</strong>
                  <div className="ms-2">
                    <PaymentStatus status={paymentData?.attributes?.paymentStatus} />
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </div>
    </>
  );
};

export default ConsultationCard;
