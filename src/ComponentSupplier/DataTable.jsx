/* eslint-disable multiline-ternary */
import {
  faEdit,
  faSort,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import LinkIconLabeled from "./LinkIconLabeled";
import ButtonDelete from "./ButtonDelete";
import BeShowed from "./BeShowed";
import BeShowedOrLoading from "./BeShowedOrLoading";
import FilterByName from "./FilterByName";
import InformNoDataLabel from "./Labels/InformNoDataLabel";
import { useEffect, useState } from "react";
import ButtonIconLabeled from "./ButtonIconLabeled";
import ExportToExcelButton from "./ExportToExcelButton";
import SingleSelection from "./SingleSelection";
import Container from "./DivisionContainers/Container";
import Label from "./Labels/Label";
import Pagination from "./Pagination";
import Table from "./Table";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import TableLabelData from "./TableLabelData";
import TableLabelHead from "./TableLabelHead";
import TableRow from "./TableRow";
import { useAuth0 } from "@auth0/auth0-react";

const DataTable = ({
  entity,
  entityPlural,
  idEntity,
  atributes,
  columns,
  rows,
  reading = false,
  readLinking = "",
  editing = false,
  editLinking = "",
  deleting = false,
  deleteService = () => {},
  handleDeleteClicked = () => {},
  setRowsAfterDelete = () => {},
  filtering = false,
  exportingToExcel = false,
  excelName = "",
}) => {
  const [rowsFiltered, setRowsFiltered] = useState(rows ? [...rows] : null);
  const [quantity, setQuantity] = useState(10);
  const [page, setPage] = useState(1);
  const [columnSort, setColumnSort] = useState(null);
  const [sortUp, setSortUp] = useState(true);
  const [nameFilter, setNameFilter] = useState("");
  const { user } = useAuth0();

  useEffect(() => {
    setNameFilter("");
    setRowsFiltered(rows ? [...rows] : null);
  }, [rows]);

  const sortByColumn = (a, b) => {
    if (a[columnSort] > b[columnSort]) {
      return sortUp ? 1 : -1;
    }
    if (a[columnSort] < b[columnSort]) {
      return sortUp ? -1 : 1;
    }
    return 0;
  };

  const handleChangeSort = (columnName) => {
    if (columnSort === columnName) {
      setSortUp(!sortUp);
    } else {
      setColumnSort(columnName);
      setSortUp(true);
    }
  };

  const setQuantityPage = ({ target }) => {
    setPage(1);
    setQuantity(target.value);
  };

  const handleFilterRows = (value) => {
    setPage(1);
    setRowsFiltered(value);
  };

  return (
    <Container>
      <Container className="row">
        <Container className="col-md-5">
          <BeShowed show={filtering}>
            <FilterByName
              entity={entity}
              name={nameFilter}
              setName={setNameFilter}
              objects={rows}
              setObjects={handleFilterRows}
              atributes={atributes}
            />
          </BeShowed>
        </Container>
        <Container className="col-md-2 offset-md-5">
          <BeShowed show={exportingToExcel}>
            <ExportToExcelButton
              titles={columns}
              body={rowsFiltered}
              fileName={excelName}
              sheetName={excelName}
            />
          </BeShowed>
        </Container>
      </Container>
      <BeShowedOrLoading show={rows} message={`Cargando ${entityPlural}`}>
        <BeShowed show={rows?.length > 0}>
          <Container className="table-responsive">
            <Table className="table">
              <TableHeader>
                <TableRow>
                  {columns.map((column, i) => {
                    return (
                      <TableLabelHead
                        key={column.name}
                        style={{ width: column.width }}
                      >
                        <Label
                          style={
                            columnSort === atributes[i] ? { color: "gray" } : {}
                          }
                        >
                          {column.name}
                        </Label>
                        <ButtonIconLabeled
                          className="btn"
                          level={2}
                          onClick={() => {
                            handleChangeSort(atributes[i]);
                          }}
                          icon={faSort}
                        />
                      </TableLabelHead>
                    );
                  })}
                </TableRow>
              </TableHeader>
              <TableBody>
                {rowsFiltered
                  ?.sort(sortByColumn)
                  .slice((page - 1) * quantity, page * quantity)
                  .map((row, i) => {
                    return (
                      <TableRow key={i}>
                        {Object.values(row).map((value, j) => {
                          return (
                            <TableLabelData key={j}>{value}</TableLabelData>
                          );
                        })}
                        <BeShowed show={reading}>
                          <TableLabelData key="read">
                            <LinkIconLabeled
                              className="btn"
                              linking={`${readLinking}/${row[idEntity]}`}
                              icon={faEye}
                            />
                          </TableLabelData>
                        </BeShowed>
                        <BeShowed show={editing}>
                          <TableLabelData key="edit">
                            <LinkIconLabeled
                              className="btn"
                              linking={`${editLinking}/${row[idEntity]}`}
                              icon={faEdit}
                            />
                          </TableLabelData>
                        </BeShowed>
                        <BeShowed show={deleting}>
                          <TableLabelData key="delete">
                            <ButtonDelete
                              className="btn"
                              level={2}
                              icon={faTrash}
                              onConfirm={() =>
                                handleDeleteClicked(
                                  `Eliminando ${entity}`,
                                  deleteService,
                                  setRowsAfterDelete,
                                  row[idEntity],
                                  user.sub.substring(6)
                                )
                              }
                            />
                          </TableLabelData>
                        </BeShowed>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <Container className="d-flex justify-content-end m-1">
              <SingleSelection
                name="quantity"
                idProperty="number"
                valueProperty="number"
                placeholder="10"
                options={[{ number: 10 }, { number: 25 }, { number: 50 }]}
                onChange={setQuantityPage}
                error=""
              />
              <Pagination
                actualPage={page}
                setActualPage={setPage}
                elementsPerPage={quantity}
                quantityOfElements={rowsFiltered?.length}
              />
            </Container>
          </Container>
        </BeShowed>
        <BeShowed show={rows?.length === 0}>
          <InformNoDataLabel entityPlural={entityPlural} />
        </BeShowed>
      </BeShowedOrLoading>
    </Container>
  );
};

export default DataTable;
