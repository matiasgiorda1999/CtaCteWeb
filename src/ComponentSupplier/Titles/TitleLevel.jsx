import React from "react";
import H1 from "./H1";
import H2 from "./H2";
import H3 from "./H3";
import H4 from "./H4";
import H5 from "./H5";
import H6 from "./H6";

const TitleLevel = ({ level, ...props }) => {
  let element;
  // eslint-disable-next-line default-case
  switch (level) {
    case 1:
      element = <H1 {...props} />;
      break;
    case 2:
      element = <H2 {...props} />;
      break;
    case 3:
      element = <H3 {...props} />;
      break;
    case 4:
      element = <H4 {...props} />;
      break;
    case 5:
      element = <H5 {...props} />;
      break;
    case 6:
      element = <H6 {...props} />;
      break;
  }
  return element;
};

export default TitleLevel;
