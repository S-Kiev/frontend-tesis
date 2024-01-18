import { FC, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './userInfoDropdown.module.scss';
import { ChevronDown, PersonCircle, BoxArrowRight, GearFill, PersonFill } from 'react-bootstrap-icons';
import { useAppSelector } from 'redux/hooks';
import { selectUser } from 'redux/reducers/userSlice';
import { roleNameMapper } from 'util/roleNameMapper';
import { LogoutModal } from 'components/modals/logoutModal';
import { useNavigate } from 'react-router-dom';

interface UserInfoDropdownProps {}

const UserInfoDropdown: FC<UserInfoDropdownProps> = () => {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic" className={styles.toggleContainer}>
          <PersonCircle className={styles.avatar} color="white" size={30} />
          <div className="d-flex flex-column justify-content-start align-items-start">
            <div className="d-flex flex-row justify-content-start align-items-center">
              <p className={styles.name}>{user?.username || ''}</p> <ChevronDown color="white" />
            </div>
            <p className={styles.email}>{user?.email}</p>
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
          <Dropdown.Item
            className={styles.clickableItem}
            onClick={() => {
              navigate(`/app/user/${user?.id}`);
            }}
          >
            <div className="d-flex justify-content-start align-items-center gap-1">
              <PersonFill />
              Mi usuario
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.clickableItem}
            onClick={() => {
              navigate(`/app/user/${user?.id}/config`);
            }}
          >
            <div className="d-flex justify-content-start align-items-center gap-1">
              <GearFill />
              Configurar usuario
            </div>
          </Dropdown.Item>
          <Dropdown.Item className={styles.clickableItem} onClick={() => setLogoutModalOpen(true)}>
            <div className="d-flex justify-content-start align-items-center gap-1">
              <BoxArrowRight />
              Cerrar sesión
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <LogoutModal show={logoutModalOpen} showModal={setLogoutModalOpen} />
    </>
  );
};

export default UserInfoDropdown;
