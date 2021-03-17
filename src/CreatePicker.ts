import { Picker } from "./Picker";
import { DefaultPickerOptions, PickerOptions } from "./PickerOptions";
import { SinglePicker } from "./SinglePicker";
import { WeightPicker } from "./WeightPicker";

export function create<T = any>(data: T[] = [], options?: PickerOptions): Picker<T> {
    options = { ...DefaultPickerOptions, ...options };
    let picker: Picker<T>;

    if (options.weighted) {
        picker = new WeightPicker<T>(data, options);
    } else {
        picker = new SinglePicker<T>(data, options);
    }

    if (options.removeOnPick) {
        (<any>picker).onAfterPick = (picked: T): void => {
            picker.remove(picked);
        };
    }

    return picker;
}