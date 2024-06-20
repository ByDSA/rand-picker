export type ThrowDartParams<T> = {
  data: T[];
  dart: number;
};

export type ThrowDartFn<T, R = T, P extends ThrowDartParams<T> = ThrowDartParams<T>> =
  (params: P)=> R | undefined;
