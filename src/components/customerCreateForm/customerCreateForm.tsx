import { CustomerCreateData } from 'models/Customer';
import { FC, useState } from 'react';

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

  switch (step) {
    case 1:
      return <div>Paso 1</div>;
    case 2:
      return <div>Paso 2</div>;
    case 3:
      return <div>Paso 3</div>;
    case 4:
      return <div>Paso 4</div>;
    default:
      return <div>Error</div>;
  }
};

export default CustomerCreateForm;
