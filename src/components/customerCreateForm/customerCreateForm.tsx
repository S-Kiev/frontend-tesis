import { CustomerCreateData } from 'models/Customer';
import { FC, useState } from 'react';
import PersonalInfo from './stepsForm/personalInfo';
import ContactInfo from './stepsForm/contactInfo';
import MedicalInfo from './stepsForm/medicalInfo';
import InformedConsent from './stepsForm/informedConsent';
import { ProgressBar } from 'react-bootstrap';
import styles from './customerCreateForm.module.scss';
import { Icon1CircleFill, Icon2CircleFill, Icon3CircleFill, Icon4CircleFill } from 'react-bootstrap-icons';

interface CustomerCreateFormProps {}

const CustomerCreateForm: FC<CustomerCreateFormProps> = () => {
  const [step, setStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CustomerCreateData>({
    name: '',
    lastname: '',
    document: '',
    birthdate: undefined,
    cellphone: '',
    email: '',
    city: undefined,
    address: '',
    howDidYouKnow: '',
    profession: '',
    reasonFirstVisit: '',
    informedConsent: null,
    medication: '',
    doctor: '',
    emergencyPhone: '',
    suffersIllness: '',
    columnProblem: false,
    operation: '',
    heartProblem: false,
    cancer: '',
    diu: false,
    metalImplants: false,
    hypertensive: false,
    varicoseVeins: false,
    coagulationProblems: false,
    comments: '',
  });
  console.log(step);
  console.log(customerData);
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
          <MedicalInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />
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
          <InformedConsent setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />
        </>
      );
    default:
      return <div>Error</div>;
  }
};

export default CustomerCreateForm;
