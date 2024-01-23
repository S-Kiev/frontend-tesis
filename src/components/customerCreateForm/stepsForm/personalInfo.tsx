import { CustomerCreateData } from 'models/Customer';
import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import styles from '../customerCreateForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { personalInfoSchema } from 'util/validations/customerShema';

interface PersonalInfoProps {
  setStep: (state: number) => void;
  customerData: CustomerCreateData;
  setCustomerData: (state: CustomerCreateData) => void;
}
const schema = yup.object().shape(personalInfoSchema);

const PersonalInfo: FC<PersonalInfoProps> = ({ setStep, customerData, setCustomerData }) => {
  const navigate = useNavigate();
  /*const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    getValues,
  } = useForm({
    criteriaMode: 'all',
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      name: '',
      lastname: '',
      document: '',
      cellphone: '',
      city: undefined,
      address: '',
    },
  });

  const onSubmit = async (dataForm: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    lastname: string;
    document: string;
    cellphone: string;
    city: number;
    address: string;
  }) => {
    setIsDisabled(true);
    mutationUser.mutate({
      username: dataForm.username,
      email: dataForm.email,
      password: dataForm.password,
      role: 4,
      confirmed: true,
    });
  };*/

  return (
    <Form className={styles.customerForm}>
      {/*onSubmit={handleSubmit(onSubmit)}*/}
      <div className="d-flex align-items-center justify-content-end mb-2" style={{ marginTop: '40px' }}>
        <Button
          variant="secondary"
          type="button"
          className="me-3"
          onClick={() => {
            navigate(`/app/customers`);
          }}
        >
          Cancelar
        </Button>
        <Button variant="success" type="submit">
          Siguiente
        </Button>
      </div>
    </Form>
  );
};

export default PersonalInfo;
