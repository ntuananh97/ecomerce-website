import { RouteObject } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthRoutes, Routes } from "@/routes/routes";
import GuestGuard from "@/components/Guard/GuestGuard";

export const clientRoutes: RouteObject[] = [
  {
    path: Routes.Home,
    element: <Home />,
  },
  {
    path: AuthRoutes.Auth,
    element: <GuestGuard />,
    children: [
      {
        path: AuthRoutes.Login,
        element: <Login />,
      },
      {
        path: AuthRoutes.Register,
        element: <Register />,
      },
    ],
  },
  
];
