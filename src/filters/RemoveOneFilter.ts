export const createRemoveOneFilter = <R>(
  resourceToRemove: R,
) => {
  return (resource: R) => {
    if (resource === undefined)
      return true;

    return resource !== resourceToRemove;
  };
};
