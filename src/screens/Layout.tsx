import { FC, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { isLoggedIn, resetStorageData } from 'util/auth';
import NoMatch from './NoMatch';
import SidebarMenu from 'components/sidebar/sidebar';
import Home from './Home';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  if (!isLoggedIn()) {
    resetStorageData();
    window.location.pathname = '/login';
  }

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleToggleSidebar = value => {
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
        </Route>

        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  );
};

export default Layout;
