import { CustomerCreateData } from 'models/Customer';
import { FC, useState } from 'react';
import PersonalInfo from './stepsForm/personalInfo';
import ContactInfo from './stepsForm/contactInfo';
import MedicalInfo from './stepsForm/medicalInfo';
import InformedConsent from './stepsForm/informedConsent';

interface CustomerCreateFormProps {}

const CustomerCreateForm: FC<CustomerCreateFormProps> = () => {
  const [step, setStep] = useState<number>(1);
  const [customerData, setCustomerData] = useState<CustomerCreateData>({
    name: '',
    lastname: '',
    document: '',
    birthdate: null,
    cellphone: '',
    email: '',
    city: null,
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
  switch (step) {
    case 1:
      return <PersonalInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />;
    case 2:
      return <ContactInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />;
    case 3:
      return <MedicalInfo setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />;
    case 4:
      return <InformedConsent setStep={setStep} customerData={customerData} setCustomerData={setCustomerData} />;
    default:
      return <div>Error</div>;
  }
};

export default CustomerCreateForm;
