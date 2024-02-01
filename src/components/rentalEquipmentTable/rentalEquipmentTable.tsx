import TableHeader from 'components/tableHeader/tableHeader';
import { EquipmentHistoryDataRental } from 'models/equipmentHistory';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowRentalEquipmentTable from './rowRentalEquipmentTable';

interface RentalEquipmentTableProps {
  data: EquipmentHistoryDataRental[];
}

const RentalEquipmentTable: FC<RentalEquipmentTableProps> = ({ data }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Fecha de comienzo ', col: 0 },
    { title: 'Fecha de finalización', col: 1 },
    { title: '', col: 2 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {data.map(element => (
          <RowRentalEquipmentTable data={element} />
        ))}
      </tbody>
    </Table>
  );
};

export default RentalEquipmentTable;
