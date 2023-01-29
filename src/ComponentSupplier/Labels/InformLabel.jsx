import Paper from "@mui/material/Paper";
import TitleLevel from "../Titles/TitleLevel";
import styled from "styled-components/macro";

const PaperStyled = styled(Paper)`
  background: ${({ theme }) => theme.bg} !important;
  color: ${({ theme }) => theme.text} !important;
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: center;
  margin-top: 20px;
`;

const InformLabel = ({ text }) => {
  return (
    <PaperStyled elevation={3}>
      <TitleLevel level={5}>{text}</TitleLevel>
    </PaperStyled>
  );
};

export default InformLabel;
