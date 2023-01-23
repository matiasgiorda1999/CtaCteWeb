import { Link } from "react-router-dom";
import React from "react";

const EnterpriseButton = ({ idempresa, name, imageUrl }) => {
  return (
    <Link
      to={`/mis-empresas/${idempresa}`}
      className="card btn"
      style={{ width: "15rem", margin: "1rem" }}
    >
      <img className="card-img-top" src={imageUrl} alt="tegua" />
      <div className="card-body">
        <label className="card-text">{name.toLocaleUpperCase()}</label>
      </div>
    </Link>
  );
};

export default EnterpriseButton;
