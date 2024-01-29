import { CustomerGetData } from 'models/Customer';
import { FC } from 'react';
import { Accordion } from 'react-bootstrap';
import './accordion.css';
import styles from './customerInfo.module.scss';
import { format } from 'date-fns';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';
import ModalImage from 'react-modal-image';

interface CustomerInfoProps {
  customerData: CustomerGetData;
}

const CustomerInfo: FC<CustomerInfoProps> = ({ customerData }) => {
  const informedConsent = customerData?.attributes?.medicalInformation?.data?.attributes?.informedConsent?.data;
  return (
    <div className={styles.conteiner}>
      <Accordion alwaysOpen>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Información personal</Accordion.Header>
          <Accordion.Body>
            <div className={styles.text}>
              <strong>Nombre:</strong>
              <p>{customerData?.attributes?.name || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Apellido:</strong>
              <p>{customerData?.attributes?.lastname || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Documento:</strong>
              <p>{customerData?.attributes?.document || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Fecha de nacimiento:</strong>
              <p>
                {customerData?.attributes?.birthdate
                  ? format(new Date(customerData?.attributes?.birthdate), 'dd.MM.yyyy')
                  : '---'}
              </p>
            </div>
            <div className={styles.textFinal}>
              <strong>Profesión:</strong>
              <p>{customerData?.attributes?.profession || '---'}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Información de contacto</Accordion.Header>
          <Accordion.Body>
            <div className={styles.text}>
              <strong>Celular:</strong>
              <p>{customerData?.attributes?.cellphone ? `+${customerData?.attributes?.cellphone}` : '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Email:</strong>
              <p>{customerData?.attributes?.email || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Ciudad:</strong>
              <p>{customerData?.attributes?.city?.data?.attributes?.cityName || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Dirección:</strong>
              <p>{customerData?.attributes?.address || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Celular de emergencia:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.emergencyPhone
                  ? `+${customerData?.attributes?.medicalInformation?.data?.attributes?.emergencyPhone}`
                  : '---'}
              </p>
            </div>
            <div className={styles.textFinal}>
              <strong>¿Cómo supo de nosotros?</strong>
              <p>{customerData?.attributes?.howDidYouKnow || '---'}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Información medica</Accordion.Header>
          <Accordion.Body>
            <div className={styles.text}>
              <strong>Razón de la primera visita:</strong>
              <p>{customerData?.attributes?.reasonFirstVisit || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Medicación:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.medication || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Doctor:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.doctor || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Padece alguna enfermedad:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.suffersIllness || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Problema de columna:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.columnProblem ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Operaciones:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.operation || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>Problemas cardiacos:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.heartProblem ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Cancer:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.cancer || '---'}</p>
            </div>
            <div className={styles.text}>
              <strong>DIU:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.diu ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Implantes metálicos:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.metalImplants ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Es hipertenso:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.hypertensive ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Varices:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.varicoseVeins ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.text}>
              <strong>Problemas de coagulación:</strong>
              <p>
                {customerData?.attributes?.medicalInformation?.data?.attributes?.coagulationProblems ? (
                  <CheckCircle size={20} color="rgba(8, 135, 93, 1)" />
                ) : (
                  <XCircle size={20} color="#dc3545" />
                )}
              </p>
            </div>
            <div className={styles.textFinal}>
              <strong>Comentarios:</strong>
              <p>{customerData?.attributes?.medicalInformation?.data?.attributes?.comments || '---'}</p>
            </div>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Consentimiento informado</Accordion.Header>
          <Accordion.Body>
            <div className={styles.text}>
              <strong>Consentimiento informado:</strong>
              <p>{informedConsent?.id ? 'Cargado en el sistema' : 'Aun no fue cargado en el sistema'}</p>
            </div>
            {informedConsent?.id && (
              <ModalImage
                small={
                  informedConsent?.attributes?.formats?.small?.url
                    ? informedConsent?.attributes?.formats?.small?.url
                    : informedConsent?.attributes?.formats?.thumbnail?.url
                }
                medium={
                  informedConsent?.attributes?.formats?.medium?.url
                    ? informedConsent?.attributes?.formats?.medium?.url
                    : informedConsent?.attributes?.formats?.thumbnail?.url
                }
                large={informedConsent?.attributes?.formats?.large?.url}
                alt={informedConsent?.attributes?.name || 'image'}
              />
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
};

export default CustomerInfo;
