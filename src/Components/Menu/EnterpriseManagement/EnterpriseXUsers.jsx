import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import ButtonIconLabeled from "../../../ComponentSupplier/ButtonIconLabeled";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import Label from "../../../ComponentSupplier/Labels/Label";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import {
  assignUsersToEnterprise,
  handleGetUsers,
} from "./EnterpriseManagementContext";
import { useArrayEntities } from "../../../Hooks/useArrayEntities";
import TitleLevel from "../../../ComponentSupplier/Titles/TitleLevel";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const EnterpriseXUsers = () => {
  const params = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const enterprisesXusers = useArrayEntities();
  const [users, setUsers] = useState([]);
  return (
    <Container className="container-fluid mt-3">
      <TitleLevel level={3}>Asignación de usuarios</TitleLevel>
      <form
        className="mt-3"
        onSubmit={async (event) =>
          assignUsersToEnterprise(
            event,
            await getAccessTokenSilently(),
            enterprisesXusers,
            params.empresaid
          )
        }
      >
        <Container className="form-group row mb-1">
          <Container className="col-md-3    ">
            <Label>Seleccionar Usuarios</Label>
          </Container>
          <Container className="col-md-8">
            <Autocomplete
              multiple
              id="tags-standard"
              options={users}
              getOptionLabel={(option) => option.email}
              filterSelectedOptions
              isOptionEqualToValue={(option, value) =>
                option.email === value.email
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard"
                  placeholder="Escriba un nombre para seleccionar los usuarios"
                />
              )}
              clearOnBlur={true}
              onChange={(e, value) => enterprisesXusers.changeContentTo(value)}
              onInputChange={async (e, value) =>
                handleGetUsers(await getAccessTokenSilently(), value, setUsers)
              }
              value={enterprisesXusers.content}
            />
          </Container>
          <Container className="col-md-1">
            <ButtonIconLabeled
              className="btn"
              type="submit"
              icon={faUserPlus}
            />
          </Container>
        </Container>
      </form>
    </Container>
  );
};

export default EnterpriseXUsers;
