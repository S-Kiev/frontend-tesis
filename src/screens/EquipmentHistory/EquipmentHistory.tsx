import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from 'api/QueryKeys';
import { getHistoryEquipment } from 'api/equipment';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { selectUser } from 'redux/reducers/userSlice';
import styles from './EquipmentHistory.module.scss';
import { ChevronLeft, CloudLightningRain, DatabaseSlash } from 'react-bootstrap-icons';
import { DotLoader } from 'react-spinners';
import PaginationComponent from 'components/pagination/pagination';
import { defaultPageSize } from 'api/paginationConfig';
import EquipmentHistoryTable from 'components/equipmentHistory/equipmentHistory';

interface EquipmentHistoryProps {}

const EquipmentHistory: FC<EquipmentHistoryProps> = () => {
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: [QueryKeys.HistoryEquipment, id, page],
    queryFn: () => getHistoryEquipment(page, id || ''),
  });

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
            <h2 className={styles.headline}>Historial de uso del Equipo</h2>
            <p>Listado de todos los usos registrados del equipos en el sistema</p>
          </div>
        </div>
      </div>
      {data?.data?.data.length === 0 && !isLoading ? (
        <div className={styles.errorFilters}>
          <DatabaseSlash size={80} />
          <h3 className="mt-3">Aún no existen usos registrados para este equipo</h3>
        </div>
      ) : null}
      {error ? (
        <div className={styles.errorFilters}>
          <CloudLightningRain size={80} />
          <h3 className="mt-3">Ups, ha ocurrido un error</h3>
          <h5 className="mb-3 text-center">Vuelve a cargar la pagina por favor</h5>
        </div>
      ) : null}
      {isLoading ? (
        <div className="d-flex align-items-center justify-content-center" style={{ marginTop: '200px' }}>
          <DotLoader color="rgb(159,213,177)" />
        </div>
      ) : null}
      {!isLoading && !error && data && data?.data?.data.length !== 0 ? (
        <>
          {<EquipmentHistoryTable equipmentData={data?.data?.data} />}
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

export default EquipmentHistory;
