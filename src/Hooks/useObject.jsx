import { useState } from "react";

export const useObject = (initialValue = {}) => {
  const [object, setObject] = useState(initialValue);

  const changePropertyTo = (propertyName, value) => {
    setObject({ ...object, [propertyName]: value });
  };

  const changeContentTo = (newObject) => {
    setObject(newObject);
  };

  return {
    content: object,
    changePropertyTo,
    changeContentTo,
  };
};
