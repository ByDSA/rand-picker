import { ThrowDartParams } from "../ThrowDartFn";

const throwDart = <T, R = T>( { data, dart }: ThrowDartParams<T>): R | undefined => {
  return data[dart] as R | undefined;
};

export {
  throwDart,
};
