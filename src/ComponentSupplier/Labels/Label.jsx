import React from "react";

const Label = (props) => {
  return (
    <label
      {...props}
      className={props.className ? props.className : "col-form-label"}
    ></label>
  );
};

export default Label;
