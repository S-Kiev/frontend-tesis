import './App.scss';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from 'screens/Welcome';
import Login from 'screens/Login/Login';
import ResetPassword from 'screens/ResetPassword';
import Layout from 'screens/Layout';

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="*" element={<Layout />} />
      </>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
