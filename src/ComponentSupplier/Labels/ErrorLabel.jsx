import React from "react";

const style = {
  fontSize: "0.8rem",
};

const ErrorLabel = (props) => {
  return (
    <label {...props} className="text-center text-danger" style={style}></label>
  );
};

export default ErrorLabel;
