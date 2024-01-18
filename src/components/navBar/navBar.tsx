import { FC } from 'react';
import styles from './navBar.module.scss';
import { List } from 'react-bootstrap-icons';
import UserInfoDropdown from './userInfoDropdown';

interface NavBarProps {
  toggled: boolean;
  handleToggleSidebar: (value: boolean) => void;
}

const NavBar: FC<NavBarProps> = ({ toggled, handleToggleSidebar }) => {
  return (
    <div className={styles.navbar}>
      <header className={styles.container}>
        <List size={40} className={styles.btnToggle} onClick={() => handleToggleSidebar(!toggled)} color="white" />
        <UserInfoDropdown />
      </header>
    </div>
  );
};

export default NavBar;
