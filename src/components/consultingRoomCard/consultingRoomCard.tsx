import { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './consultingRoomCard.module.scss';
import { format } from 'date-fns';
import { ConsultingRoomData } from 'models/ConsultingRoom';
import ConsultingRoomStatus from 'components/consultingRoomStatus/consultingRoomStatus';

interface ConsultingRoomCardProps {
  consultingRoomData: ConsultingRoomData;
}

const ConsultingRoomCard: FC<ConsultingRoomCardProps> = ({ consultingRoomData }) => {
  return (
    <Card className={styles.cardEquipment}>
      <Card.Body>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Nombre:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{consultingRoomData?.attributes?.name || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Descripción:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{consultingRoomData?.attributes?.description || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Acción necesaria:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{consultingRoomData?.attributes?.necessaryAction || 'Ninguna'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Estado del consultorio:</Card.Subtitle>
        <Card.Text className="mb-3">
          <ConsultingRoomStatus status={consultingRoomData?.attributes?.status} />
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Fecha de alta:</Card.Subtitle>
        <Card.Text>
          {consultingRoomData?.attributes?.createdAt
            ? format(new Date(consultingRoomData?.attributes?.createdAt), 'dd.MM.yyyy')
            : '---'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ConsultingRoomCard;
