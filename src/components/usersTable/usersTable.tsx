import TableHeader from 'components/tableHeader/tableHeader';
import { FC } from 'react';
import { Table } from 'react-bootstrap';
import RowUsersTable from './rowUsersTable';

interface UsersTableProps {
  usersData: any;
  search: string;
}

const UsersTable: FC<UsersTableProps> = ({ usersData, search }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Usuario', col: 0 },
    { title: 'Rol', col: 1 },
    { title: 'Estado', col: 2 },
    { title: 'Fecha de Creación', col: 3 },
    { title: '', col: 4 },
  ];

  return (
    <Table responsive="md">
      <TableHeader headersList={headersList} />
      <tbody>
        {usersData.map(element => (
          <RowUsersTable userData={element} search={search} />
        ))}
      </tbody>
    </Table>
  );
};

export default UsersTable;
