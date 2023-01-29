import React from "react";

const BeShowed = ({ show, children }) => {
  if (show) {
    return children;
  } else {
    return <></>;
  }
};
export default BeShowed;
