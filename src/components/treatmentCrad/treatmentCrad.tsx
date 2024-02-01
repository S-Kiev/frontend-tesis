import { FC } from 'react';
import { Card } from 'react-bootstrap';
import styles from './treatmentCrad.module.scss';
import { format } from 'date-fns';
import { TreatmentGetData } from 'models/Treatments';
import { CircleFill } from 'react-bootstrap-icons';

interface TreatmentCradProps {
  treatmentData: TreatmentGetData;
}

const TreatmentCrad: FC<TreatmentCradProps> = ({ treatmentData }) => {
  return (
    <Card className={styles.cardEquipment}>
      <Card.Body>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Nombre:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{treatmentData?.attributes?.name || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Descripción:</Card.Subtitle>
        <Card.Text className="mb-3">
          <p>{treatmentData?.attributes?.description || '---'}</p>
        </Card.Text>
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Equipamiento:</Card.Subtitle>
        {treatmentData?.attributes?.equipments?.data?.length > 0 ? (
          treatmentData?.attributes?.equipments?.data?.map(item => {
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
        {treatmentData?.attributes?.consultingRooms?.data?.map(item => {
          return (
            <>
              <Card.Text className="mb-3 ms-3 d-flex align-items-center">
                <CircleFill size={5} className="me-2" color="rgba(8, 135, 93, 1)" />{' '}
                <p>{item?.attributes?.name || '---'}</p>
              </Card.Text>
            </>
          );
        })}
        <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Fecha de alta:</Card.Subtitle>
        <Card.Text className={'mb-3'}>
          {treatmentData?.attributes?.createdAt
            ? format(new Date(treatmentData?.attributes?.createdAt), 'dd.MM.yyyy')
            : '---'}
        </Card.Text>
        {treatmentData?.attributes?.deactivationDate ? (
          <>
            <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Estado:</Card.Subtitle>
            <Card.Text className="mb-3">
              <p>Desactivado</p>
            </Card.Text>
            <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Fecha de desactivación:</Card.Subtitle>
            <Card.Text>
              {treatmentData?.attributes?.deactivationDate
                ? format(new Date(treatmentData?.attributes?.deactivationDate), 'dd.MM.yyyy')
                : '---'}
            </Card.Text>
          </>
        ) : (
          <>
            <Card.Subtitle className={`mb-2 text-mute ${styles.text}`}>Estado:</Card.Subtitle>
            <Card.Text className="mb-3">
              <p>Activo</p>
            </Card.Text>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default TreatmentCrad;
