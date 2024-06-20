import { Filter } from "./filters";

export type PickOptions<T> = {
  unique?: boolean;
  sequential?: boolean;
  filters?: Filter<T>[];
};

export const DefaultPickOptions: PickOptions<unknown> = {
  unique: false,
  sequential: false,
};
