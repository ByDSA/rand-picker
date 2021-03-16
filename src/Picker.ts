import { AbstractPicker, DefaultPickerOptions, PickerOptions } from "./AbstractPicker";

export class Picker<T> extends AbstractPicker<T> {
    constructor(data: T[], options: PickerOptions = DefaultPickerOptions) {
        super(data, options);

        if (options.removeOnPick) {
            this.onAfterPick = (picked: T): void => {
                let index: number = this.data.indexOf(picked);
                if (index === -1)
                    return;

                this.data.splice(index, 1);
            }
        }
    }
    throwDart(dart: number): T | undefined {
        return this.data[dart];
    }
}