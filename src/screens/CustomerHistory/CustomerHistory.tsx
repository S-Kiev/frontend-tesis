import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerHistory.module.scss';
import { BoxArrowInDown, ChevronLeft, CloudLightningRain, DatabaseSlash, Rulers } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultationsByCustomer } from 'api/consultation';
import { getCustomersMesurments, getCustomersPayments } from 'api/customers';
import { parseCustumerHistoryData } from 'util/parseCustumerHistoryData';
import CustomerHistoryTable from 'components/customerHistoryTable/customerHistoryTable';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { MeasurementsModal } from 'components/modals/measurementsModal';
import { generateBlob } from 'util/fileServices/generateBlob';
import { generateLink } from 'util/fileServices/generateLink';
import { NotificationToastExport } from 'components/toast/toastExport';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import HiddenCustomerHistory from './HiddenCustomerHistory';

interface CustomerHistoryProps {}

const CustomerHistory: FC<CustomerHistoryProps> = () => {
  const [page, setPage] = useState<number>(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CosnultationByCustomer, id, page],
    queryFn: () => getConsultationsByCustomer(page, id || ''),
  });

  const { data: dataHidden } = useQuery({
    queryKey: [QueryKeys.CosnultationByCustomer, id, page],
    queryFn: () => getConsultationsByCustomer(page, id || '', 100),
  });

  const {
    data: dataPayments,
    error: errorPayments,
    isLoading: isLoadingPayments,
  } = useQuery({
    queryKey: [QueryKeys.CustomersPayments, id],
    queryFn: () => getCustomersPayments(id || ''),
  });

  const {
    data: dataMeasurements,
    error: errorMeasurements,
    isLoading: isLoadingMeasurements,
  } = useQuery({
    queryKey: [QueryKeys.Measurements, id],
    queryFn: () => getCustomersMesurments(id || ''),
  });

  const handleOnClickReport = (type: 'pdf' | 'jpeg') => {
    const REPORT_NAME = `Historial ${data?.data?.data[0].attributes?.customer?.data?.attributes?.name} ${data?.data?.data[0].attributes?.customer?.data?.attributes?.lastname}`;
    generateBlob('hiddenImageGeneratorHistoryCustomer').then(data => {
      if (data.error === undefined) {
        const imgUrl = URL.createObjectURL(data.blob!);
        notificationToastExportSuccess();
        if (type === 'pdf') {
          const pdf = new jsPDF({
            orientation: 'landscape',
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
            <h2 className={styles.headline}>Historial de consultas cliente</h2>
            <p>Listado de todas las consultas registradas del cliente en el sistema</p>
          </div>
        </div>
        <div className="d-flex gap-3">
          <Dropdown as={ButtonGroup} className="d-none d-lg-block">
            <Button variant="success" onClick={() => {}}>
              <BoxArrowInDown style={{ marginRight: '5px' }} />
              Descargar
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
          <Button
            variant="success"
            onClick={() => {
              setShowModal(true);
            }}
            className="d-none d-lg-block"
          >
            <Rulers style={{ marginRight: '5px' }} />
            Resumen de medidas
          </Button>
        </div>
      </div>
      <div className="d-grid gap-2">
        <Dropdown as={ButtonGroup} className="d-lg-none mt-3">
          <Button variant="success" onClick={() => {}}>
            <BoxArrowInDown style={{ marginRight: '5px' }} />
            Descargar
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
        <Button
          variant="success"
          onClick={() => {
            setShowModal(true);
          }}
          className="d-lg-none mt-3"
        >
          <Rulers style={{ marginRight: '5px' }} />
          Resumen de medidas
        </Button>
      </div>
      {data?.data?.data.length === 0 && !isLoading ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen consultas registradas para este cliente</h3>
        </div>
      ) : null}
      {error || errorPayments || errorMeasurements ? (
        <div className={styles.errorFilters}>
          <CloudLightningRain size={80} />
          <h3 className="mt-3">Ups, ha ocurrido un error</h3>
          <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
        </div>
      ) : null}
      {isLoading && isLoadingPayments && isLoadingMeasurements ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : null}
      {!isLoading && !error && !isLoadingPayments && !errorPayments && data && data?.data?.data?.length !== 0 ? (
        <>
          {<CustomerHistoryTable data={parseCustumerHistoryData(data?.data?.data, dataPayments?.data?.data)} />}
          {data?.data?.meta?.pagination?.total > defaultPageSize && (
            <div className="d-flex justify-content-center mt-4">
              <PaginationComponent
                data={data?.data?.meta?.pagination}
                changePage={(e: any) => {
                  setPage(e.page);
                }}
              />
            </div>
          )}
        </>
      ) : null}
      <MeasurementsModal show={showModal} showModal={setShowModal} customerMesurements={dataMeasurements?.data?.data} />
      <div style={{ marginTop: '1000px' }}>
        <HiddenCustomerHistory data={parseCustumerHistoryData(dataHidden?.data?.data, dataPayments?.data?.data)} />
      </div>
    </div>
  );
};

export default CustomerHistory;
