
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import PantanoDetails from './PantanoDetails.jsx';
import Perfil from './Perfil.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { UserContext } from './context/UserContext';
import Login from './Login.jsx';
import Registro from './Registro.jsx';

//console.log(import.meta.env.VITE_PROJECT_ID)

// Usuario simulado
const usuarioSimulado = {
  id: "Ndw9ViAft6gPct2roo5A ",
  nombre: "Javier Ruiz",
  email: "javier@gmail.com",
  telefono: "610234567"
};

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/:id", element: <PantanoDetails /> },
  { path: "/perfil", element: <Perfil /> },
  { path: "/login", element: <Login /> },
  { path: "/registro", element: <Registro /> },
  { path: "*", element: <NotFound /> }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext.Provider value={usuarioSimulado}>
      <RouterProvider router={router} />
    </UserContext.Provider>
  </StrictMode>
);