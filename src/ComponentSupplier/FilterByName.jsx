import React from "react";
import Container from "./DivisionContainers/Container";
import SingleInputTextLabeled from "./SingleInputTextLabeled";

const FilterByName = ({
  entity,
  name,
  setName,
  objects,
  setObjects,
  atributes,
}) => {
  const handleChangeInputName = ({ target }) => {
    const { value } = target;
    setName(value);
    filterObjects(value.toUpperCase());
  };

  const filterObjects = (name) => {
    const objectsFiltered = objects.filter((object) => {
      let objectHavePropertyThatContainTheName = false;
      atributes.forEach((atribute) => {
        if (object[atribute].toString().toUpperCase().includes(name))
          objectHavePropertyThatContainTheName = true;
      });
      return objectHavePropertyThatContainTheName;
    });
    setObjects(objectsFiltered);
  };

  return (
    <Container>
      <SingleInputTextLabeled
        label="Buscar"
        name="filterByName"
        placeholder={`Buscar ${entity} ...`}
        minLength="0"
        maxLength="100"
        value={name}
        onChange={handleChangeInputName}
        error=""
      />
    </Container>
  );
};

export default FilterByName;
