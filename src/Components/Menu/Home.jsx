import React from "react";
import CheckingAccountNavbar from "../Navbar/CheckingAccountNavbar.jsx";
import BeRenderizedOneOrOther from "../../ComponentSupplier/Renderizing/BeRenderizedOneOrOther";
import CuitForm from "./AccountSetting/CuitForm";
import Container from "../../ComponentSupplier/DivisionContainers/Container.jsx";
import { Outlet } from "react-router-dom";

const Home = ({ user }) => {
  return (
    <Container>
      <BeRenderizedOneOrOther
        boolean={user.cuit}
        ifTrueRender={
          <CheckingAccountNavbar
            disableAllOptions={!user.cuit}
            isAdmin={user.user_roles[0] === "Admin"}
          />
        }
        ifFalseRender={<CuitForm user={user} />}
      />
      <Outlet />
    </Container>
  );
};

export default Home;
