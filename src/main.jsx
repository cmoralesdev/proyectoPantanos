import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './NotFound.jsx'
import PantanoDetails from './PantanoDetails.jsx'


const router = createBrowserRouter([{ path: "/", element: <Home /> }, { path: "/:id", element: <PantanoDetails /> }, { path: "*", element: <NotFound /> }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
