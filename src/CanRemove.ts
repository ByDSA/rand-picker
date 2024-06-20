import { Filter } from "./filters";

export interface CanRemove<T> {
  remove(obj: T): T | undefined;
  clear(): void;
  filter(...filters: Filter<T>[]): T[];
}
