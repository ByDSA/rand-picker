import { AbstractPicker } from "./AbstractPicker";

export class SinglePicker<T> extends AbstractPicker<T> {
    throwDart = (dart: number): T | undefined => {
        return this.data[dart];
    }

    onAfterPick: ((t: T) => void) | undefined;

    get weight(): number {
        return this.data.length;
    }
}