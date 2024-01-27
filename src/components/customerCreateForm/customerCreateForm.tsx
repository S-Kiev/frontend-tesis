import { CustomerCreateData, CustomerGetData } from 'models/Customer';
import { FC, useState } from 'react';
import PersonalInfo from './stepsForm/personalInfo';
import ContactInfo from './stepsForm/contactInfo';
import MedicalInfo from './stepsForm/medicalInfo';
import InformedConsent from './stepsForm/informedConsent';
import { ProgressBar } from 'react-bootstrap';
import styles from './customerCreateForm.module.scss';
import { Icon1CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill } from 'react-bootstrap-icons';

interface CustomerCreateFormProps {
  edit?: boolean;
  customerEditData?: CustomerGetData;
}

const CustomerCreateForm: FC<CustomerCreateFormProps> = ({ edit = false, customerEditData }) => {
  const [step, setStep] = useState<number>(1);
  const [alertMedicalInfo, setAlertMedicalInfo] = useState<boolean>(true);
  const [alertInformedConsent, setAlertInformedConsent] = useState<boolean>(true);
  const [customerData, setCustomerData] = useState<CustomerCreateData>({
    name: edit && customerEditData ? customerEditData.attributes?.name : '',
    lastname: edit && customerEditData ? customerEditData.attributes?.lastname : '',
    document: edit && customerEditData ? customerEditData.attributes?.document : '',
    birthdate: edit && customerEditData ? customerEditData.attributes?.birthdate : undefined,
    cellphone: edit && customerEditData ? customerEditData.attributes?.cellphone : '',
    email: edit && customerEditData ? customerEditData.attributes?.email || '' : '',
    city: edit && customerEditData ? customerEditData.attributes?.city?.data?.id : undefined,
    address: edit && customerEditData ? customerEditData.attributes?.address : '',
    howDidYouKnow: edit && customerEditData ? customerEditData.attributes?.howDidYouKnow : '',
    profession: edit && customerEditData ? customerEditData.attributes?.profession || '' : '',
    reasonFirstVisit: edit && customerEditData ? customerEditData.attributes?.reasonFirstVisit || '' : '',
    informedConsent: null,
    medication:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.medication || ''
        : '',
    doctor:
      edit && customerEditData ? customerEditData.attributes?.medicalInformation?.data?.attributes?.doctor || '' : '',
    emergencyPhone:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.emergencyPhone || ''
        : '',
    suffersIllness:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.suffersIllness || ''
        : '',
    columnProblem:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.columnProblem
        : false,
    operation:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.operation || ''
        : '',
    heartProblem:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.heartProblem
        : false,
    cancer:
      edit && customerEditData ? customerEditData.attributes?.medicalInformation?.data?.attributes?.cancer || '' : '',
    diu: edit && customerEditData ? customerEditData.attributes?.medicalInformation?.data?.attributes?.diu : false,
    metalImplants:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.metalImplants
        : false,
    hypertensive:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.hypertensive
        : false,
    varicoseVeins:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.varicoseVeins
        : false,
    coagulationProblems:
      edit && customerEditData
        ? customerEditData.attributes?.medicalInformation?.data?.attributes?.coagulationProblems
        : false,
    comments:
      edit && customerEditData ? customerEditData.attributes?.medicalInformation?.data?.attributes?.comments || '' : '',
  });

  switch (step) {
    case 1:
      return (
        <>
          <div className="d-flex align-items-center mb-2">
            <Icon1CircleFill size={32} className="me-2" color="rgba(8, 135, 93, 1)" />
            <h3 className={styles.title}>Información personal</h3>
          </div>
          <ProgressBar variant="success" now={25} striped />
          <PersonalInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />
        </>
      );
    case 2:
      return (
        <>
          <div className="d-flex align-items-center mb-2">
            <Icon2CircleFill size={32} className="me-2" color="rgba(8, 135, 93, 1)" />
            <h3 className={styles.title}>Información de contacto</h3>
          </div>
          <ProgressBar variant="success" now={50} striped />
          <ContactInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />
        </>
      );
    case 3:
      return (
        <>
          <div className="d-flex align-items-center mb-2">
            <Icon3CircleFill size={32} className="me-2" color="rgba(8, 135, 93, 1)" />
            <h3 className={styles.title}>Información médica</h3>
          </div>
          <ProgressBar variant="success" now={75} striped />
          <MedicalInfo
            setStep={setStep}
            customerData={customerData}
            setCustomerData={setCustomerData}
            alertMedicalInfo={alertMedicalInfo}
            setAlertMedicalInfo={setAlertMedicalInfo}
            edit={edit}
          />
        </>
      );
    case 4:
      return (
        <>
          <div className="d-flex align-items-center mb-2">
            <Icon4CircleFill size={32} className="me-2" color="rgba(8, 135, 93, 1)" />
            <h3 className={styles.title}>Consentimiento informado</h3>
          </div>
          <ProgressBar variant="success" now={100} striped />
          <InformedConsent
            setStep={setStep}
            customerData={customerData}
            setCustomerData={setCustomerData}
            alertInformedConsent={alertInformedConsent}
            setAlertInformedConsent={setAlertInformedConsent}
            customerEditData={customerEditData}
            edit={edit}
          />
        </>
      );
    default:
      return <div>Error</div>;
  }
};

export default CustomerCreateForm;
