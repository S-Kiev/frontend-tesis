import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem, Sidebar, menuClasses } from 'react-pro-sidebar';
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  CalendarWeek,
  PersonFillGear,
  PeopleFill,
  Clipboard2Fill,
  BandaidFill,
  BoxSeamFill,
} from 'react-bootstrap-icons';
import styles from '../sidebar/sidebar.module.scss';
import NavBar from 'components/navBar/navBar';
import logo from 'assets/EnergiaNaturalB64.png';
import { useSelector } from 'react-redux';
import { selectUser } from 'redux/reducers/userSlice';
import { Role } from 'models/Roles';

const SidebarMenu = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange }) => {
  const user = useSelector(selectUser);

  return (
    <div style={{ display: 'flex', height: '100vh', position: 'fixed', width: '100%' }}>
      <Sidebar
        className="app"
        onBackdropClick={() => handleToggleSidebar(false)}
        toggled={toggled}
        breakPoint="md"
        collapsed={collapsed}
      >
        <Menu>
          {collapsed ? (
            <MenuItem
              icon={<ChevronDoubleRight />}
              onClick={handleCollapsedChange}
              rootStyles={{
                ['.' + menuClasses.button]: {
                  backgroundColor: '#fbfbfb',
                  color: '#fbfbfb',
                  '&:hover': {
                    backgroundColor: '#eecef9',
                  },
                },
              }}
            ></MenuItem>
          ) : (
            <MenuItem
              suffix={<ChevronDoubleLeft />}
              onClick={handleCollapsedChange}
              rootStyles={{
                ['.' + menuClasses.button]: {
                  backgroundColor: '#fbfbfb',
                  color: '#fbfbfb',
                  '&:hover': {
                    backgroundColor: '#eecef9',
                  },
                },
              }}
            >
              <div className="d-flex flex-row align-items-center">
                <img src={logo} alt="logo" style={{ height: '30px' }} />
                <div className={styles.titleText}>Energía Natural</div>
              </div>
            </MenuItem>
          )}
          <MenuItem component={<Link to="/app/consultations" />} icon={<CalendarWeek />}>
            Consultas
          </MenuItem>
          <MenuItem component={<Link to="/app/equipments" />} icon={<BoxSeamFill />}>
            Equipos
          </MenuItem>
          <MenuItem component={<Link to="/app/treatments" />} icon={<BandaidFill />}>
            Tratamientos
          </MenuItem>
          <MenuItem component={<Link to="/app/consultingsRooms" />} icon={<Clipboard2Fill />}>
            Consultorios
          </MenuItem>
          <MenuItem component={<Link to="/app/customers" />} icon={<PeopleFill />}>
            Clientes
          </MenuItem>
          {user?.role === Role.superAdmin && (
            <MenuItem component={<Link to="/app/users" />} icon={<PersonFillGear />}>
              Usuarios
            </MenuItem>
          )}
        </Menu>
      </Sidebar>
      <NavBar toggled={toggled} handleToggleSidebar={handleToggleSidebar} />
      <main className={`col ${styles.conteiner}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarMenu;
