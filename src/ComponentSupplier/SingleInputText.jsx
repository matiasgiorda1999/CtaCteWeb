import React from "react";
import ErrorLabel from "./Labels/ErrorLabel";
import Container from "./DivisionContainers/Container";
import styled from "styled-components";

export const SingleInputTextStyled = styled.input`
  background: ${({ theme }) => theme.bgAlpha};
  color: ${({ theme }) => theme.text};
  &:focus {
    background: ${({ theme }) => theme.bgAlpha};
    color: ${({ theme }) => theme.text};
  }
  &:read-only {
    background: ${({ theme }) => theme.bgReadOnly};
  }
`;

const SingleInputText = ({
  name,
  placeholder,
  minLength = "1",
  maxLength = "999",
  value,
  onChange,
  error,
  readOnly,
}) => {
  return (
    <Container>
      <SingleInputTextStyled
        type="text"
        className={!error ? "form-control" : "form-control is-invalid"}
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </Container>
  );
};

export default SingleInputText;
