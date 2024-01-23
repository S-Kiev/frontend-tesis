import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';
import * as yup from 'yup';
import { informedConsentSchema } from 'util/validations/customerShema';

interface InformedConsentProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const schema = yup.object().shape(informedConsentSchema);

const InformedConsent: FC<InformedConsentProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Informed Consent</div>;
};

export default InformedConsent;
