import './App.scss';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from 'screens/Welcome'; 
import Login from 'screens/Login/Login';
import NoMatch from 'screens/NoMatch';
import ResetPassword from 'screens/ResetPassword';
import Home from 'screens/Home';

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/resetpass" element={<ResetPassword/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="*" element={<NoMatch/>} />
      </>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
