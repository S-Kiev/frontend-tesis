import { FC } from 'react';
import { format } from 'date-fns';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import CustomerHistoryTable from 'components/customerHistoryTable/customerHistoryTable';
import { ConsultationData } from 'models/Consultation';

interface HiddenCustomerHistoryProps {
  data: ConsultationData[];
}

const HiddenCustomerHistory: FC<HiddenCustomerHistoryProps> = ({ data }) => {
  const user = useSelector(selectUser);
  const styles = {
    p100: {
      fontSize: '16px',
      fontWeight: 400,
      lineHeight: '20px',
    },
    p300: {
      fontSize: '11px',
      fontWeight: 400,
      lineHeight: '14px',
      marginBottom: '15px',
      marginTop: '15px',
      marginRight: '16px',
    },
    bold: {
      fontWeight: 600,
    },
    headline500: {
      color: '#066042',
      fontSize: '27.65px',
      fontWeight: 500,
      lineHeight: '150%',
    },
    temporaryImgContainer: {
      Width: '297mm',
      minWeight: '210mm',
      zIndex: -100,
      backgroundColor: '#fafbfd',
      position: 'fixed' as const,
    },
    header: {
      height: '10%',
      marginLeft: '10%',
      marginTop: '32px',
    },
    dataContainer: {
      width: '80%',
      height: '70%',
      margin: '3% 10% 0px 10%',
      marginTop: '60px',
    },
    detail: {
      height: '3%',
      display: 'flex',
      justifyContent: 'flex-end',
      minWidth: '297mm',
      alignItems: 'center',
      background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), #F1F3F9',
    },
  };

  return (
    <>
      <div style={{ ...styles.temporaryImgContainer, backgroundColor: '#fff', zIndex: -99 }}></div>
      <div style={styles.temporaryImgContainer} id="hiddenImageGeneratorHistoryCustomer">
        <div style={styles.detail}>
          <p style={styles.p300}>
            {format(new Date(), 'dd/MM/yyyy')} <span style={styles.bold}> {`${user?.username} ID:${user?.id}`}</span>
          </p>
        </div>
        <header style={styles.header}>
          <h1 style={styles.headline500}>{`Historial de consultas cliente`}</h1>
          <p style={styles.p100}>
            <strong>Cliente:</strong>
            {` ${data[0]?.attributes?.customer?.data?.attributes?.name || '---'} ${
              data[0]?.attributes?.customer?.data?.attributes?.lastname || '---'
            }`}
          </p>
          <p style={styles.p100}>
            <strong>Documento:</strong>
            {` ${data[0]?.attributes?.customer?.data?.attributes?.document || '---'}`}
          </p>
          <p style={styles.p100}>
            <strong>Celular:</strong>
            {` +${data[0]?.attributes?.customer?.data?.attributes?.cellphone || '---'}`}
          </p>
        </header>
        <div style={styles.dataContainer}>{<CustomerHistoryTable data={data} report />}</div>
        <footer style={{ ...styles.detail, paddingTop: '5px' }}>
          <p style={styles.p300}>
            <span style={styles.bold}>Información confidencial</span> - Copyright © Energía natural{' '}
            {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </>
  );
};

export default HiddenCustomerHistory;
