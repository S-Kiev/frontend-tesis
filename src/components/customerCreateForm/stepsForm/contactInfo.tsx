import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import styles from '../customerCreateForm.module.scss';

interface ContactInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}

const ContactInfo: FC<ContactInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  return <div>Contact Info</div>;
};

export default ContactInfo;
