import React from "react";

const ButtonLabeled = ({ label = "", children, ...props }) => {
  return (
    <button {...props}>
      {children} {label}
    </button>
  );
};

export default ButtonLabeled;
