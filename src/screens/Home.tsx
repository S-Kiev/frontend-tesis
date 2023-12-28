import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { resetStorageData } from 'util/auth';

interface HomeProps {}

const Home: FC<HomeProps> = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    queryClient.clear();
    resetStorageData();
    navigate('/login');
  };

  return (
    <div>
      Home
      <Button className="btn" onClick={logOut}>
        Cerrar sesión
      </Button>
    </div>
  );
};

export default Home;
