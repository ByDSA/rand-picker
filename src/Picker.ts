import { CanPick } from "./CanPick";
import { CanRemove } from "./CanRemove";
import { PickerOptions } from "./PickerOptions";

export interface Picker<T> extends CanPick<T>, CanRemove<T> {
  length: number;
  data: T[];
  options: Readonly<Required<PickerOptions>>;
}
