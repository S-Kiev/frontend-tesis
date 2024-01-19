import { FC } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ExclamationTriangleFill } from 'react-bootstrap-icons';
import { Spinner } from 'react-bootstrap';

interface AlertModalProps {
  show: boolean;
  title: string;
  body: JSX.Element;
  confirmBtn: string;
  cancelBtn: string;
  showModal: (state: boolean) => void;
  onAction: Function;
  isDisabled: boolean;
  setIsDisabled: (state: boolean) => void;
  confirmBtnVariant?: string;
  cancelBtnVariant?: string;
  hideAlertIcon?: boolean;
}

export const AlertModal: FC<AlertModalProps> = ({
  show,
  title,
  body,
  showModal,
  onAction,
  confirmBtn,
  cancelBtn,
  isDisabled,
  setIsDisabled,
  hideAlertIcon,
  confirmBtnVariant,
  cancelBtnVariant,
}) => {
  const handleAction = async () => {
    setIsDisabled(true);
    onAction();
  };

  return (
    <Modal onHide={() => showModal(false)} show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {!hideAlertIcon && <ExclamationTriangleFill color="#DC3545" />} {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          disabled={isDisabled}
          onClick={() => showModal(false)}
          variant={cancelBtnVariant ? cancelBtnVariant : 'secondary'}
        >
          {cancelBtn}
        </Button>
        <Button disabled={isDisabled} onClick={handleAction} variant={confirmBtnVariant ? confirmBtnVariant : 'danger'}>
          <div>
            {isDisabled && <Spinner className="me-1" size="sm" />}
            <span>{confirmBtn}</span>
          </div>
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
