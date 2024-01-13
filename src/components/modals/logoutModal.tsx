import { useQueryClient } from '@tanstack/react-query';
import { FC } from 'react';
import { DoorOpenFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { resetStorageData } from 'util/auth';

interface LogoutModalProps {
  show: boolean;
  showModal: (state: boolean) => void;
}

export const LogoutModal: FC<LogoutModalProps> = ({ show, showModal }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const logOut = () => {
    queryClient.clear();
    resetStorageData();
    navigate('/login');
  };

  const handleLogout = async () => {
    logOut();
    showModal(false);
  };

  return (
    <>
      <Modal onHide={() => showModal(false)} show={show} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <DoorOpenFill /> Cierre de sesión
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Está seguro que quiere cerrar la sesión? Tendrá que volver a iniciar sesión para ingresar a la aplicación.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => showModal(false)} variant="secondary">
            No, volver atrás
          </Button>
          <Button onClick={handleLogout} variant="danger">
            Sí, cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
