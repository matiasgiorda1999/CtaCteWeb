import React from "react";
import Label from "./Labels/Label";
import ButtonIconLabeled from "./ButtonIconLabeled";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  actualPage,
  setActualPage,
  elementsPerPage,
  quantityOfElements,
}) => {
  return (
    <>
      <ButtonIconLabeled
        className="btn"
        level={2}
        onClick={() => {
          setActualPage(actualPage - 1);
        }}
        disabled={(actualPage - 1) * elementsPerPage < 1}
        icon={faArrowLeft}
      />
      <Label>
        {actualPage} al{" "}
        {parseInt((quantityOfElements - 1) / elementsPerPage) + 1}
      </Label>
      <ButtonIconLabeled
        className="btn"
        level={2}
        onClick={() => {
          setActualPage(actualPage + 1);
        }}
        disabled={actualPage * elementsPerPage >= quantityOfElements}
        icon={faArrowRight}
      />
    </>
  );
};

export default Pagination;
