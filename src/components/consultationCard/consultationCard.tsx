import { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './consultationCard.module.scss';
import { format } from 'date-fns';
import { ConsultationGetDataView } from 'models/Consultation';
import { CircleFill } from 'react-bootstrap-icons';
import { ConsultingRoomHistoryItem } from 'models/ConsultingRoomHistory';

interface ConsultationCardProps {
  data: ConsultationGetDataView;
  dataConsultingRooms: ConsultingRoomHistoryItem[];
}

const ConsultationCard: FC<ConsultationCardProps> = ({ data, dataConsultingRooms }) => {
  return (
    <Card className={styles.cardEquipment}>
      <Card.Body>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Cliente:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{`${data?.customer?.data?.attributes?.name || '---'} ${
            data?.customer?.data?.attributes?.lastname || '---'
          }`}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Tratamientos:</Card.Subtitle>
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
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Equipamiento:</Card.Subtitle>
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
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Consultorios:</Card.Subtitle>
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
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Hora de comienzo de la consulta:</Card.Subtitle>
        <Card.Text className={'mb-3'}>
          {data?.since ? format(new Date(data?.since), 'dd.MM.yyyy HH:mm') + 'hs' : '---'}
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Hora de fin de la consulta:</Card.Subtitle>
        <Card.Text className={'mb-3'}>
          {data?.until ? format(new Date(data?.until), 'dd.MM.yyyy HH:mm') + 'hs' : '---'}
        </Card.Text>
        {dataConsultingRooms?.length > 2 && (
          <>
            <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Horas consultorios:</Card.Subtitle>
            {dataConsultingRooms?.map(item => {
              return (
                <>
                  <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                    <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                    <p>
                      <strong>{item?.attributes?.consulting_room?.data?.attributes?.name || '---'}</strong>
                      {` de ${
                        item.attributes?.since ? format(new Date(item.attributes?.since), 'HH:mm') + 'hs' : '---'
                      } hasta ${
                        item.attributes?.until ? format(new Date(item.attributes?.until), 'HH:mm') + 'hs' : '---'
                      }`}
                    </p>
                  </Card.Text>
                </>
              );
            })}
          </>
        )}
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Comentarios:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{data?.comments}</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConsultationCard;
