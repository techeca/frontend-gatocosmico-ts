import App from "./App";
import LoginPage from "./pages/Login/LoginPage";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Negocio from "./pages/Admin/Negocio.tsx";
import Usuarios from "./pages/Admin/Usuarios.tsx";
import Home from "./pages/Home/HomePage.tsx";
import NotFound from "./pages/NotFound/index.tsx";
import Agendamiento from "./pages/Admin/Agendamiento.tsx";

const routes = [
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: 'Profile',
        element: <Profile/>
      },
      {
        path: 'settings/*',
        element: <Admin />,
        children: [
          {
            path: 'negocio',
            element: <Negocio />
          },
          {
            path: 'usuarios',
            element: <Usuarios />
          },
          {
            path: 'agendamiento',
            element: <Agendamiento />
          }
        ]
      },
      {
        path: '*',
        element: <NotFound />
      },
      {
        path: "/login",
        element: <LoginPage/>
      },
      {
        path: "/home",
        element: <Home/>
      }
    ],
  },
  
];

export default routes