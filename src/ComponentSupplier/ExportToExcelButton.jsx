import React from "react";
import ButtonIconLabeled from "./ButtonIconLabeled";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";

const XLSX = require("xlsx");

const ExportToExcelButton = ({ titles, body, fileName, sheetName, level }) => {
  const buildArrayData = () => {
    const arrayTitles = [];
    titles.forEach(({ name }) => arrayTitles.push(name));
    const arrayData = [arrayTitles];
    body.forEach((object) => {
      arrayData.push([...Object.values(object)]);
    });
    return arrayData;
  };

  const exportToExcelFile = () => {
    const array = buildArrayData();
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(array);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <ButtonIconLabeled
      level={level}
      className="btn btn-success w-100"
      onClick={exportToExcelFile}
      label="Exportar a excel &nbsp;"
      icon={faFileExcel}
    />
  );
};

export default ExportToExcelButton;
