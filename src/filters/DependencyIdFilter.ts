import { DependencyFilterParams, SerializedDependencyList, defaultSerializeFn } from "./DependencyFilter";

type GetItemIdFn<R, ID> = (item: R)=> ID;

type DependencyIdFilterParams<R, ID> = DependencyFilterParams<ID> & {
  getItemId?: GetItemIdFn<R, ID>;
};
export const createDependencyIdFilterGenerator = <R, ID>(
  { dependencies,
    getItemId = defaultGetItemIdFn as GetItemIdFn<R, ID>,
    serialize = defaultSerializeFn }: DependencyIdFilterParams<R, ID>,
) => {
  const serializedDependencies = dependencies.reduce(
    (acc, [first, second])=> {
      acc[serialize(first)] = serialize(second);

      return acc;
    },
    {} as SerializedDependencyList,
  );

  return (lastId?: ID) => {
    return (item: R): boolean => {
      if (lastId === undefined)
        return true;

      const serializedLast = serialize(lastId);
      const value = serializedDependencies[serializedLast];

      if (!value)
        return true;

      const serializedItem = serialize(getItemId(item));

      return value === serializedItem;
    };
  };
};

const defaultGetItemIdFn: GetItemIdFn<unknown, unknown> = <R>(item: R)=> item;
