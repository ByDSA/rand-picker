export type Serialized = string;

export type DependencyList<R> = [R, R][];

export type SerializeFn<R> = (item: R)=> Serialized;

export type SerializedDependencyList = Record<Serialized, Serialized>;

export type DependencyFilterParams<R> = {
  dependencies: DependencyList<R>;
  serialize?: SerializeFn<R>;
};

export const createDependencyFilterGenerator = <R>(
  { dependencies, serialize = defaultSerializeFn }: DependencyFilterParams<R>,
) => {
  const serializedDependencies = dependencies.reduce(
    (acc, [first, second])=> {
      acc[serialize(first)] = serialize(second);

      return acc;
    },
    {} as SerializedDependencyList,
  );

  return (last?: R) => {
    return (item: R) => {
      if (last === undefined)
        return true;

      const serializedLast = serialize(last);
      const value = serializedDependencies[serializedLast];

      if (!value)
        return true;

      let serializedItem = serialize(item);

      return value === serializedItem;
    };
  };
};

export const defaultSerializeFn: SerializeFn<unknown> = (self: unknown)=> {
  switch (typeof self) {
    case "string":
      return self;
    case "number":
      return self.toString();
    case "object":
    default:
      return JSON.stringify(self);
  }
};
