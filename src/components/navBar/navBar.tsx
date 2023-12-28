import { FC } from 'react';
import styles from './navBar.module.scss';

const NavBar: FC = ({}) => {
  return (
    <header className={styles.container}>
      <nav className="d-flex flex-row justify-content-end align-items-center">
        <p>Hola</p>
        {/*<UserInfoDropdown isInForm={isInForm} />*/}
      </nav>
    </header>
  );
};

export default NavBar;
