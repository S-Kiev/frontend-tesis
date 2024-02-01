import TableHeader from 'components/tableHeader/tableHeader';
import { TreatmentsData } from 'models/Treatments';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowTreatmentsTable from './rowTreatmentsTable';

interface TreatmentsTableProps {
  treatmentsData: TreatmentsData[];
  search: string;
  page: number;
}

const TreatmentsTable: FC<TreatmentsTableProps> = ({ treatmentsData, search, page }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'ID', col: 0 },
    { title: 'Nombre', col: 1 },
    { title: '', col: 3 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {treatmentsData.map(element => (
          <RowTreatmentsTable treatmentData={element} search={search} page={page} />
        ))}
      </tbody>
    </Table>
  );
};

export default TreatmentsTable;
