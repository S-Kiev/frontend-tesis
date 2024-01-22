import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isLoggedIn, resetStorageData } from 'util/auth';
import NoMatch from './NoMatch';
import SidebarMenu from 'components/sidebar/sidebar';
import Home from './Home';
import Consultations from './Consultations/Consultations';
import Equipments from './Equipments/Equipments';
import Treatments from './Treatments/Treatments';
import ConsultingsRooms from './ConsultingsRooms/ConsultingsRooms';
import Customers from './Customers/Customers';
import Users from './Users/Users';
import User from './User/User';
import UserCreate from './UserCreate/UserCreate';
import MyUserConfig from './MyUserConfig/MyUserConfig';
import CustomerCreate from './CustomerCreate/CustomerCreate';
import Customer from './Customer/Customer';
import CustomerEdit from './CustomerEdit/CustomerEdit';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  if (!isLoggedIn()) {
    resetStorageData();
    window.location.pathname = '/';
  }

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = (value: boolean) => {
    setToggled(value);
  };

  return (
    <>
      <Routes>
        <Route
          path="/app"
          element={
            <SidebarMenu
              collapsed={collapsed}
              toggled={toggled}
              handleToggleSidebar={handleToggleSidebar}
              handleCollapsedChange={handleCollapsedChange}
            />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="equipments" element={<Equipments />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="consultingsRooms" element={<ConsultingsRooms />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/create" element={<CustomerCreate />} />
          <Route path="customers/:id" element={<Customer />} />
          <Route path="customers/:id/edit" element={<CustomerEdit />} />
          <Route path="users" element={<Users />} />
          <Route path="users/create" element={<UserCreate />} />
          <Route path="user/:id" element={<User />} />
          <Route path="user/:id/config" element={<MyUserConfig />} />
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Layout;
