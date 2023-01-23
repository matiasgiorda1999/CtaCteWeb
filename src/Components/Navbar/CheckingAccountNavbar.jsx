import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

const CheckingAccountNavbar = ({ disableAllOptions = false }) => {
  const { logout } = useAuth0();
  return (
    <Navbar bg="light" expand="lg">
      <Link className="navbar-brand" to={"/"}>
        Cuenta Corriente
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {disableAllOptions ? (
        <></>
      ) : (
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-link active" to={"/mis-empresas"}>
              Mis empresas
            </Link>
            <NavDropdown title="Usuario" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Mis datos</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      )}
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <Nav.Link href="/" onClick={logout}>
            Cerrar sesión <FontAwesomeIcon icon={faSignOutAlt} />
          </Nav.Link>
        </Navbar.Text>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CheckingAccountNavbar;
