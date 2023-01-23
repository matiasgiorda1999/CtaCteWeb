import React from "react";

const BeRenderizedOneOrOther = ({
  boolean,
  ifTrueRender = <></>,
  ifFalseRender = <></>,
}) => {
  if (boolean) {
    return ifTrueRender;
  } else {
    return ifFalseRender;
  }
};
export default BeRenderizedOneOrOther;
