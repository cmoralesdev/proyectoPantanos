
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import PantanoDetails from './PantanoDetails.jsx';
import Perfil from './Perfil.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Login from './Login.jsx';
import Registro from './Registro.jsx';
import RecoverPass from './RecoverPass.jsx';



const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:id", element: <PantanoDetails /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Registro /> },
  { path: "/recover", element: <RecoverPass /> },
  { path: "*", element: <NotFound /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </StrictMode>
);