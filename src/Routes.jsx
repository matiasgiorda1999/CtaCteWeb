import React from "react";
import Home from "./Components/Menu/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Enterprises from "./Components/Menu/Enterprises/Enterprises";
import EnterpriseSelectionPeriod from "./Components/Menu/EnterpriseSelectionPeriod/EnterpriseSelectionPeriod.jsx";
import CheckingAccount from "./Components/Menu/CheckingAccount/CheckingAccount.jsx";

const Routes = ({ user }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home user={user} />,
      children: [
        {
          path: "/mis-empresas",
          element: <Enterprises userUniqueName={user.sub} />,
        },
        {
          path: "/mis-empresas/:empresaid",
          element: <EnterpriseSelectionPeriod />,
        },
        {
          path: "/cuenta-corriente",
          element: <CheckingAccount />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
