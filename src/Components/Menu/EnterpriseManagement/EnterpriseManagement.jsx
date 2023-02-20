import React from "react";
import Container from "../../../ComponentSupplier/DivisionContainers/Container";
import { useGetEntities } from "../../../Hooks/useGetEntities";
import Table from "../../../ComponentSupplier/Table";
import TableHeader from "../../../ComponentSupplier/TableHeader";
import TableRow from "../../../ComponentSupplier/TableRow";
import TableLabelHead from "../../../ComponentSupplier/TableLabelHead";
import Label from "../../../ComponentSupplier/Labels/Label";
import TableBody from "../../../ComponentSupplier/TableBody";
import TableLabelData from "../../../ComponentSupplier/TableLabelData";
import LinkIconLabeled from "../../../ComponentSupplier/LinkIconLabeled";
import {
  faEdit,
  faEye,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import ButtonDelete from "../../../ComponentSupplier/ButtonDelete";
import TitleLevel from "../../../ComponentSupplier/Titles/TitleLevel";
import LinkLabeled from "../../../ComponentSupplier/LinkLabeled";
import locationOf from "../../../locationOf";
import { deleteEnterprise } from "./EnterpriseManagementContext";
import { useAuth0 } from "@auth0/auth0-react";

const PORT = require("../../../config");

const EnterpriseManagement = () => {
  const { getAccessTokenSilently } = useAuth0();
  const enterprises = useGetEntities(`${PORT()}/empresas`);
  return (
    <Container className="container-fluid mt-3">
      <TitleLevel level={3}>Listado de empresas</TitleLevel>
      <Container className="d-flex justify-content-end">
        <LinkLabeled
          className="btn btn-primary"
          label="Nueva empresa"
          linking={locationOf("/empresas/nueva")}
        />
      </Container>
      <Container className="table-responsive">
        <Table className="table">
          <TableHeader>
            <TableRow>
              <TableLabelHead className="col-md-5">
                <Label>Empresa</Label>
              </TableLabelHead>
              <TableLabelHead className="col-md-5">
                <Label>CUIT</Label>
              </TableLabelHead>
              <TableLabelHead />
              <TableLabelHead />
              <TableLabelHead />
              <TableLabelHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {enterprises.content?.map(({ idempresa, nombre, CUIT }) => {
              return (
                <TableRow key={CUIT}>
                  <TableLabelData>{nombre}</TableLabelData>
                  <TableLabelData>{CUIT}</TableLabelData>
                  <TableLabelData>
                    <LinkIconLabeled
                      className="btn"
                      linking={`/empresas/asignar/${idempresa}`}
                      icon={faUser}
                    />
                  </TableLabelData>
                  <TableLabelData>
                    <LinkIconLabeled
                      className="btn"
                      linking={`/empresas/detalle/${idempresa}`}
                      icon={faEye}
                    />
                  </TableLabelData>
                  <TableLabelData>
                    <LinkIconLabeled
                      className="btn"
                      linking={`/empresas/editar/${idempresa}`}
                      icon={faEdit}
                    />
                  </TableLabelData>
                  <TableLabelData>
                    <ButtonDelete
                      className="btn"
                      level={2}
                      icon={faTrash}
                      onConfirm={async () => {
                        deleteEnterprise(
                          idempresa,
                          await getAccessTokenSilently()
                        );
                      }}
                    />
                  </TableLabelData>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Container>
    </Container>
  );
};
export default EnterpriseManagement;
