import React from "react";
import { Link } from "react-router-dom";
import TitleLevel from "./Titles/TitleLevel";
import DataTable from "./DataTable";
import Container from "./DivisionContainers/Container";
import BeShowed from "./BeShowed";

const BasicCRUD = ({
  entity,
  entityPlural,
  idEntity,
  dataTableAtributes,
  dataTableColumns,
  dataTableRows,
  creating = false,
  createLinking,
  reading,
  readLinking,
  editing,
  editLinking,
  deleting,
  deleteService,
  handleDeleteClicked,
  setRowsAfterDelete,
  filtering,
  exportingToExcel,
}) => {
  return (
    <Container>
      <TitleLevel level={3}>Listado de {entityPlural}</TitleLevel>
      <hr />
      <BeShowed show={creating}>
        <Container className="row mb-3">
          <Container className="col-md-2 offset-md-10">
            <Link className=" btn btn-primary w-100" to={createLinking}>
              Crear {entity}
            </Link>
          </Container>
        </Container>
      </BeShowed>
      <DataTable
        entity={entity}
        entityPlural={entityPlural}
        idEntity={idEntity}
        atributes={dataTableAtributes}
        columns={dataTableColumns}
        rows={dataTableRows}
        reading={reading}
        readLinking={readLinking}
        editing={editing}
        editLinking={editLinking}
        deleting={deleting}
        deleteService={deleteService}
        handleDeleteClicked={handleDeleteClicked}
        setRowsAfterDelete={setRowsAfterDelete}
        filtering={filtering}
        exportingToExcel={exportingToExcel}
        excelName={`${entityPlural}_${new Date().toISOString().slice(0, 10)}`}
      />
    </Container>
  );
};

export default BasicCRUD;
