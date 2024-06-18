import Picker from "./Picker";
import { DefaultPickerOptions, PickerOptions } from "./PickerOptions";
import SinglePicker from "./SinglePicker";
import WeightPicker from "./WeightPicker";

export default function create<T = any>(
  data: T[] = [],
  options?: PickerOptions,
): Picker<T> {
  const currentOptions = {
    ...DefaultPickerOptions,
    ...options,
  };
  let picker: Picker<T>;

  if (currentOptions.weighted)
    picker = new WeightPicker<T>(data, currentOptions);
  else
    picker = new SinglePicker<T>(data, currentOptions);

  if (currentOptions.removeOnPick) {
    (<any>picker).onAfterPick = (picked: T): void => {
      picker.remove(picked);
    };
  }

  return picker;
}
