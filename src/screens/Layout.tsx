import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isLoggedIn, resetStorageData } from 'util/auth';
import NoMatch from './NoMatch';
import SidebarMenu from 'components/sidebar/sidebar';
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
import TrearmentCreate from './TrearmentCreate/TrearmentCreate';
import TreatmentsEdit from './TreatmentsEdit/TreatmentsEdit';
import Treatment from './Treatment/Treatment';
import EquipmentCreate from './EquipmentCreate/EquipmentCreate';
import Equipment from './Equipment/Equipment';
import EquipmentEdit from './EquipmentEdit/EquipmentEdit';
import ConsultingRoomCreate from './ConsultingRoomCreate/ConsultingRoomCreate';
import ConsultingRoom from './ConsultingRoom/ConsultingRoom';
import ConsultingRoomEdit from './ConsultingRoomEdit/ConsultingRoomEdit';
import ConsultationCreate from './ConsultationCreate/ConsultationCreate';
import Consultation from './Consultation/Consultation';
import ConsultationEdit from './ConsultationEdit/ConsultationEdit';
import CustomerHistory from './CustomerHistory/CustomerHistory';
import EquipmentHistory from './EquipmentHistory/EquipmentHistory';
import ConsultingsRoomsHistory from './ConsultingsRoomsHistory/ConsultingsRoomsHistory';
import ObservationEdit from './ObservationEdit/ObservationEdit';
import ObservationCreate from './ObservationCreate/ObservationCreate';

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
          <Route path="consultations" element={<Consultations />} />
          <Route path="consultations/create" element={<ConsultationCreate />} />
          <Route path="consultations/:id" element={<Consultation />} />
          <Route path="consultations/:id/edit" element={<ConsultationEdit />} />
          <Route path="consultations/:id/observation/create" element={<ObservationCreate />} />
          <Route path="consultations/:id/observation/:observationId/edit" element={<ObservationEdit />} />
          <Route path="equipments" element={<Equipments />} />
          <Route path="equipments/:id/history" element={<EquipmentHistory />} />
          <Route path="equipments/create" element={<EquipmentCreate />} />
          <Route path="equipments/:id" element={<Equipment />} />
          <Route path="equipments/:id/edit" element={<EquipmentEdit />} />
          <Route path="treatments" element={<Treatments />} />
          <Route path="treatments/create" element={<TrearmentCreate />} />
          <Route path="treatments/:id" element={<Treatment />} />
          <Route path="treatments/:id/edit" element={<TreatmentsEdit />} />
          <Route path="consultingsRooms" element={<ConsultingsRooms />} />
          <Route path="consultingsRooms/:id/history" element={<ConsultingsRoomsHistory />} />
          <Route path="consultingsRooms/create" element={<ConsultingRoomCreate />} />
          <Route path="consultingsRooms/:id" element={<ConsultingRoom />} />
          <Route path="consultingsRooms/:id/edit" element={<ConsultingRoomEdit />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customers/:id/history" element={<CustomerHistory />} />
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
