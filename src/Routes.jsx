import React from "react";
import Home from "./Components/Menu/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Enterprises from "./Components/Menu/Enterprises/Enterprises";
import EnterpriseSelectionPeriod from "./Components/Menu/EnterpriseSelectionPeriod/EnterpriseSelectionPeriod.jsx";
import CheckingAccount from "./Components/Menu/CheckingAccount/CheckingAccount.jsx";
import locationOf from "./locationOf.js";
import EnterpriseManagement from "./Components/Menu/EnterpriseManagement/EnterpriseManagement.jsx";
import FormEnterprise from "./Components/Menu/EnterpriseManagement/EnterpriseForm.jsx";
import EnterpriseXUsers from "./Components/Menu/EnterpriseManagement/EnterpriseXUsers.jsx";

const Routes = ({ user }) => {
  const routes = {
    path: locationOf(),
    element: <Home user={user} />,
    children: [
      {
        path: locationOf("/mis-empresas"),
        element: <Enterprises userUniqueName={user.sub} />,
      },
      {
        path: locationOf("/mis-empresas/:empresaid"),
        element: <EnterpriseSelectionPeriod />,
      },
      {
        path: locationOf("/cuenta-corriente"),
        element: <CheckingAccount />,
      },
    ],
  };
  if (user.user_roles[0] === "Admin")
    routes.children = [
      ...routes.children,
      {
        path: locationOf("/empresas"),
        element: <EnterpriseManagement />,
      },
      {
        path: locationOf("/empresas/nueva"),
        element: <FormEnterprise title="Registrar empresa" />,
      },
      {
        path: locationOf("/empresas/editar/:empresaid"),
        element: <FormEnterprise title="Editar empresa" />,
      },
      {
        path: locationOf("/empresas/detalle/:empresaid"),
        element: <FormEnterprise title="Ver empresa" disableOptions={true} />,
      },
      {
        path: locationOf("/empresas/asignar/:empresaid"),
        element: <EnterpriseXUsers />,
      },
    ];
  const router = createBrowserRouter([routes]);
  return <RouterProvider router={router} />;
};
export default Routes;
