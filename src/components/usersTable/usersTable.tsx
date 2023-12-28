import TableHeader from 'components/tableHeader/tableHeader';
import { FC } from 'react';
import { Table } from 'react-bootstrap';

interface UsersTableProps {
  usersData: any;
}

const UsersTable: FC<UsersTableProps> = ({ usersData }) => {
  const headersList: { title: string; col: number }[] = [
    { title: 'Usuario', col: 0 },
    { title: 'Rol', col: 1 },
    { title: 'Estado', col: 2 },
    { title: 'Fecha de Creación', col: 3 },
    { title: '', col: 4 },
  ];

  return (
    <Table>
      <TableHeader headersList={headersList} />
      <tbody>
        {/*usersData.map(element => (

        ))*/}
      </tbody>
    </Table>
  );
};

export default UsersTable;
