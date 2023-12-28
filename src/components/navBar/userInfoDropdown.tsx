import { FC, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './userInfoDropdown.module.scss';
import { ChevronDown, PersonCircle, BoxArrowRight, GearFill } from 'react-bootstrap-icons';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/reducers/userSlice';
import { roleNameMapper } from 'util/roleNameMapper';

interface UserInfoDropdownProps {
  isInForm?: boolean;
}

const UserInfoDropdown: FC<UserInfoDropdownProps> = props => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const user = useAppSelector(selectUser);

  const toggleSignoutModal = () => {
    setLogoutModalOpen(!logoutModalOpen);
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.toggleContainer}>
          <PersonCircle className={styles.avatar} color="white" size={30} />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="d-flex flex-row justify-content-start align-items-center">
              <p className={styles.name}>{user?.username || ''}</p> <ChevronDown color="white" />
            </div>
            <p className={styles.email}>Email: {user?.email}</p>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu align={'start'} className={styles.menu}>
          <Dropdown.Item className={styles.infoItem}>
            <div>
              <p>
                <strong>{'Rol: '}</strong>
                {user?.role ? roleNameMapper(user.role) : ''}
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item className={styles.clickableItem} onClick={() => {}}>
            <div className="d-flex justify-content-start align-items-center gap-1">
              <GearFill />
              Configurar usuario
            </div>
          </Dropdown.Item>
          <Dropdown.Item className={styles.clickableItem} onClick={() => setLogoutModalOpen(!logoutModalOpen)}>
            <div className="d-flex justify-content-start align-items-center gap-1">
              <BoxArrowRight />
              Cerrar sesión
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {/*<LogoutModal isOpen={logoutModalOpen} toggleModal={toggleSignoutModal} isInForm={isInForm} />*/}
    </>
  );
};

export default UserInfoDropdown;
