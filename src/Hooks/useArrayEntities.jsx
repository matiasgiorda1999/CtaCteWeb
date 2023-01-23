import { useState } from "react";

export const useArrayEntities = (initialState = []) => {
  const [entities, setEntities] = useState(initialState);

  const retrieveEntityAt = (index) => {
    return entities[index];
  };

  const retrieveEntityIdentifiedBy = (identifiedName, identifier) => {
    return entities.find((entity) => entity[identifiedName] === identifier);
  };

  const pushEntityAt = (entity, index = entities.length) => {
    const newEntities = [...entities];
    newEntities.splice(index, 0, entity);
    setEntities(newEntities);
  };

  const pushEntitiesAt = (entitiesToAdd, index = entities.length) => {
    const newEntities = [...entities];
    newEntities.splice(index, 0, ...entitiesToAdd);
    setEntities(newEntities);
  };

  const removeEntityAt = (index) => {
    const newEntities = [...entities];
    newEntities.splice(index, 1);
    setEntities(newEntities);
  };

  const removeEntityIdentifiedBy = (identifierName, identifier) => {
    setEntities(
      entities.filter((entity) => entity[identifierName] !== identifier)
    );
  };

  const replaceEntityAt = (entity, index) => {
    const newEntities = [...entities];
    newEntities[index] = entity;
    setEntities(newEntities);
  };

  const replaceEntityIdentifiedByWith = (
    identifierName,
    identifier,
    entity
  ) => {
    const index = entities.findIndex(
      (entity) => entity[identifierName] !== identifier
    );
    replaceEntityAt(entity, index);
  };

  const changePropertyToOfEntityLocatedAt = (property, value, index) => {
    const entity = entities[index];
    entity[property] = value;
    replaceEntityAt(entity, index);
  };

  const changeContentTo = (newEntities) => {
    setEntities(newEntities);
  };

  return {
    content: entities,
    retrieveEntityAt,
    retrieveEntityIdentifiedBy,
    pushEntityAt,
    pushEntitiesAt,
    removeEntityAt,
    removeEntityIdentifiedBy,
    replaceEntityAt,
    replaceEntityIdentifiedByWith,
    changePropertyToOfEntityLocatedAt,
    changeContentTo,
  };
};
