import React from "react";
import Home from "./Components/Menu/Home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Enterprises from "./Components/Menu/Enterprises/Enterprises";
import EnterpriseSelectionPeriod from "./Components/Menu/EnterpriseSelectionPeriod/EnterpriseSelectionPeriod.jsx";
import CheckingAccount from "./Components/Menu/CheckingAccount/CheckingAccount.jsx";
import locationOf from "./locationOf.js";

const Routes = ({ user }) => {
  const router = createBrowserRouter([
    {
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
    },
  ]);
  return <RouterProvider router={router} />;
};
export default Routes;
