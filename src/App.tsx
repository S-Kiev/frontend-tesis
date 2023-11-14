import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Welcome from 'screens/Welcome'; 
import Login from 'screens/Login';
import NoMatch from 'screens/NoMatch';

function App() {
  let router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
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
