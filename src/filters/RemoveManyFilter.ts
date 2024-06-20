export const createRemoveManyFilter = <R>(
  resourcesToRemove: R[],
) => {
  return (resource: R) => {
    return !resourcesToRemove.includes(resource);
  };
};
