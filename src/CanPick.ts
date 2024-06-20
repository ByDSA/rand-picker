import { PickOptions } from "./PickOptions";

export interface CanPick<T> {
  pickOne(options?: PickOptions<T>): T | undefined;
  pick(n: number, options?: PickOptions<T>): T[];
}
