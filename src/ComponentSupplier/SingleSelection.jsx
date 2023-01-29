import React from "react";
import ErrorLabel from "./Labels/ErrorLabel";
import Container from "./DivisionContainers/Container";
import styled from "styled-components";

const SingleSelectionStyled = styled.select`
  background-color: ${({ theme }) => theme.bgAlpha};
  color: ${({ theme }) => theme.text};
`;

const SingleSelection = ({
  name,
  placeholder,
  idProperty,
  valueProperty,
  value,
  options,
  disabled,
  onChange,
  error,
}) => {
  return (
    <Container>
      <SingleSelectionStyled
        name={name}
        value={value}
        className={!error ? "form-select" : "form-select is-invalid"}
        onChange={onChange}
        disabled={disabled}
      >
        <option value="DEFAULT" hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          return (
            <option key={option[idProperty]} value={option[idProperty]}>
              {option[valueProperty]}
            </option>
          );
        })}
      </SingleSelectionStyled>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Container>
  );
};

export default SingleSelection;
