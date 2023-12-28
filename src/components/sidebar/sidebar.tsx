import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem, SubMenu, Sidebar } from 'react-pro-sidebar';
import {
  List,
  ChevronDoubleLeft,
  ChevronDoubleRight,
  HouseDoorFill,
  CalendarWeek,
  PersonFillGear,
  PeopleFill,
  Clipboard2Fill,
  BandaidFill,
  BoxSeamFill,
} from 'react-bootstrap-icons';
import styles from '../sidebar/sidebar.module.scss';
import { Button } from 'react-bootstrap';
import NavBar from 'components/navBar/navBar';
import logo from 'assets/EnergiaNaturalB64.png';

/*
PENDIENTES:
- Diseño sidebar
- Hacer NavBar para cierre sesion y usuario 
background: '#FAFCFE'
*/

const SidebarMenu = ({ collapsed, toggled, handleToggleSidebar, handleCollapsedChange }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar
        className="app"
        onBackdropClick={() => handleToggleSidebar(false)}
        toggled={toggled}
        breakPoint="md"
        collapsed={collapsed}
      >
        <Menu>
          {collapsed ? (
            <MenuItem icon={<ChevronDoubleRight />} onClick={handleCollapsedChange}></MenuItem>
          ) : (
            <MenuItem suffix={<ChevronDoubleLeft />} onClick={handleCollapsedChange}>
              <div className="d-flex flex-row align-items-center">
                <img src={logo} alt="logo" style={{ height: '30px' }} />
                <div className={styles.titleText}>Energía Natural</div>
              </div>
            </MenuItem>
          )}
          <MenuItem component={<Link to="/app/home" className="link" />} icon={<HouseDoorFill />}>
            Home
          </MenuItem>
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
          <MenuItem component={<Link to="/app/users" />} icon={<PersonFillGear />}>
            Usuarios
          </MenuItem>
        </Menu>
      </Sidebar>
      <div className={`col ${styles.conteiner}`}>
        <NavBar />
        <main className={styles.main}>
          <Button className={styles.btnToggle} onClick={() => handleToggleSidebar(!toggled)}>
            <List size={50} />
          </Button>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SidebarMenu;
