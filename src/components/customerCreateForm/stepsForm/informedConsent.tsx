import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';

interface InformedConsentProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const InformedConsent: FC<InformedConsentProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Informed Consent</div>;
};

export default InformedConsent;
