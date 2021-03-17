import { Picker } from "./Picker";

export class SinglePicker<T> extends Picker<T> {
    throwDart = (dart: number): T | undefined => {
        return this._data[dart];
    }

    onAfterPick: ((t: T) => void) | undefined;

    get weight(): number {
        return this._data.length;
    }
}