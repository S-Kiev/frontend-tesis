import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getCustomerInfo } from 'api/customers';
import { FC } from 'react';
import { ChevronLeft, ClockHistory, CloudLightningRain, PencilSquare, PersonFillDown } from 'react-bootstrap-icons';
import { useNavigate, useParams } from 'react-router-dom';
import { DotLoader } from 'react-spinners';
import styles from './Customer.module.scss';
import { Button, ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import { selectUser } from 'redux/reducers/userSlice';
import { useSelector } from 'react-redux';
import { Role } from 'models/Roles';
import CustomerInfo from 'components/customerInfo/customerInfo';
import HiddenCustomer from './HiddenCustomer';
import { generateBlob } from 'util/fileServices/generateBlob';
import { generateLink } from 'util/fileServices/generateLink';
import jsPDF from 'jspdf';
import { NotificationToastExport } from 'components/toast/toastExport';
import { toast } from 'react-toastify';

interface CustomerProps {}

const Customer: FC<CustomerProps> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user = useSelector(selectUser);

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.Customer, id],
    queryFn: () => getCustomerInfo(id || ''),
  });

  const handleOnClickReport = (type: 'pdf' | 'jpeg') => {
    const REPORT_NAME = `Reporte ${data?.data?.data?.attributes?.name} ${data?.data?.data?.attributes?.lastname}`;
    generateBlob('hiddenImageGeneratorCustomer').then(data => {
      if (data.error === undefined) {
        const imgUrl = URL.createObjectURL(data.blob!);
        notificationToastExportSuccess();
        if (type === 'pdf') {
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [data.dimensions.width, data.dimensions.height],
          });
          pdf.addImage(imgUrl, 'JPEG', 0, 0, data.dimensions.width, data.dimensions.height);
          pdf.save(`${REPORT_NAME}.pdf`);
        } else {
          generateLink(imgUrl, REPORT_NAME, 'jpeg');
        }
        URL.revokeObjectURL(imgUrl);
      } else {
        notificationToastExportError();
      }
    });
  };

  const notificationToastExportError = () => {
    toast(<NotificationToastExport type={'error'} reload={handleOnClickReport} />, {
      style: { borderRadius: '10px' },
    });
  };

  const notificationToastExportSuccess = () => {
    toast(<NotificationToastExport type={'success'} />, {
      style: { borderRadius: '10px' },
    });
  };

  return (
    <div className={styles.container}>
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '300px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : (
        <>
          {error ? (
            <div className={styles.error}>
              <CloudLightningRain size={80} />
              <h3 className="mt-3">Ups, ha ocurrido un error</h3>
              <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
            </div>
          ) : (
            <>
              <div className={styles.header}>
                <div className="d-flex align-items-center">
                  <ChevronLeft
                    size={35}
                    className={styles.pointer}
                    onClick={() => {
                      navigate(-1);
                    }}
                  />
                  <div className={styles.titleConteiner}>
                    <h2 className={styles.headline}>{`${data?.data?.data?.attributes?.name || '---'} ${
                      data?.data?.data?.attributes?.lastname || '---'
                    }`}</h2>
                    <p>{`Documento: ${data?.data?.data?.attributes?.document || '---'}`}</p>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  {user?.role === Role.collaborator ? (
                    <Button
                      variant="success"
                      onClick={() => navigate(`/app/customers/${id}/edit`)}
                      className="d-none d-lg-block"
                    >
                      <PencilSquare style={{ marginRight: '5px' }} />
                      Editar
                    </Button>
                  ) : null}
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/customers/${id}/history`)}
                    className="d-none d-lg-block"
                  >
                    <ClockHistory style={{ marginRight: '5px' }} />
                    Ver Historial Consultas
                  </Button>
                  <Dropdown as={ButtonGroup} className="d-none d-lg-block">
                    <Button variant="success" onClick={() => {}}>
                      <PersonFillDown style={{ marginRight: '5px' }} />
                      Descargar Ficha
                    </Button>
                    <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          handleOnClickReport('pdf');
                        }}
                      >
                        PDF
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          handleOnClickReport('jpeg');
                        }}
                      >
                        JPG
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              <div className="d-grid gap-2">
                {user?.role === Role.collaborator ? (
                  <Button
                    variant="success"
                    onClick={() => navigate(`/app/customers/${id}/edit`)}
                    className="d-lg-none mt-3"
                  >
                    <PencilSquare style={{ marginRight: '5px' }} />
                    Editar
                  </Button>
                ) : null}
                <Button
                  variant="success"
                  onClick={() => navigate(`/app/customers/${id}/history`)}
                  className="d-lg-none mt-3"
                >
                  <ClockHistory style={{ marginRight: '5px' }} />
                  Ver Historial Consultas
                </Button>
                <Dropdown as={ButtonGroup} className="d-lg-none mt-3">
                  <Button variant="success" onClick={() => {}}>
                    <PersonFillDown style={{ marginRight: '5px' }} />
                    Descargar Ficha
                  </Button>
                  <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        handleOnClickReport('pdf');
                      }}
                    >
                      PDF
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        handleOnClickReport('jpeg');
                      }}
                    >
                      JPEG
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div className={styles.form}>
                {<CustomerInfo customerData={data?.data?.data} defaultActiveKey={['0']} />}
              </div>
              <div style={{ marginTop: '500px' }}>{<HiddenCustomer data={data?.data?.data} />}</div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Customer;
