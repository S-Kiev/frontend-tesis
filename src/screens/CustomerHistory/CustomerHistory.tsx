import { FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CustomerHistory.module.scss';
import { ChevronLeft, CloudLightningRain, DatabaseSlash } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getConsultationsByCustomer } from 'api/consultation';
import { getCustomersPayments } from 'api/customers';
import { parseCustumerHistoryData } from 'util/parseCustumerHistoryData';
import CustomerHistoryTable from 'components/customerHistoryTable/customerHistoryTable';

interface CustomerHistoryProps {}

const CustomerHistory: FC<CustomerHistoryProps> = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.CosnultationByCustomer, id, page],
    queryFn: () => getConsultationsByCustomer(page, id || ''),
  });

  const {
    data: dataPayments,
    error: errorPayments,
    isLoading: isLoadingPayments,
  } = useQuery({
    queryKey: [QueryKeys.CustomersPayments, id],
    queryFn: () => getCustomersPayments(id || ''),
  });

  console.log(parseCustumerHistoryData(data?.data?.data, dataPayments?.data?.data));
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
      </div>
      {data?.data?.data.length === 0 && !isLoading ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen consultas registradas para este cliente</h3>
        </div>
      ) : null}
      {error || errorPayments ? (
        <div className={styles.errorFilters}>
          <CloudLightningRain size={80} />
          <h3 className="mt-3">Ups, ha ocurrido un error</h3>
          <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
        </div>
      ) : null}
      {isLoading && isLoadingPayments ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : null}
      {!isLoading && !error && !isLoadingPayments && !errorPayments && data && data?.data?.data.length !== 0 ? (
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
    </div>
  );
};

export default CustomerHistory;
