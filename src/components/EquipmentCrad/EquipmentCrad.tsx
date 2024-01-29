import { EquipmentData } from 'models/Equipment';
import { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './EquipmentCrad..module.scss';
import EquipmentStatus from 'components/equipmentStatus/equipmentStatus';
import { format } from 'date-fns';

interface EquipmentCardProps {
  equipmentData: EquipmentData;
}

const EquipmentCard: FC<EquipmentCardProps> = ({ equipmentData }) => {
  return (
    <Card className={styles.cardEquipment}>
      <Card.Body>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Nombre:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{equipmentData?.attributes?.name || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Marca:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{equipmentData?.attributes?.brand || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Descripción:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{equipmentData?.attributes?.description || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Estado de disponibilidad:</Card.Subtitle>
        <Card.Text className="mb-3">
          <EquipmentStatus status={equipmentData?.attributes?.status} />
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Fecha de alta:</Card.Subtitle>
        <Card.Text className={equipmentData?.attributes?.deactivationDate ? 'mb-3' : ''}>
          {equipmentData?.attributes?.createdAt
            ? format(new Date(equipmentData?.attributes?.createdAt), 'dd.MM.yyyy')
            : '---'}
        </Card.Text>
        {equipmentData?.attributes?.deactivationDate && (
          <>
            <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Fecha de desactivación:</Card.Subtitle>
            <Card.Text>
              {equipmentData?.attributes?.deactivationDate
                ? format(new Date(equipmentData?.attributes?.deactivationDate), 'dd.MM.yyyy')
                : '---'}
            </Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default EquipmentCard;
