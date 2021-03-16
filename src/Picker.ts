import { create } from "./CreatePicker";
import { PickerOptions } from "./PickerOptions";
import { DefaultPickOptions, PickOptions } from "./PickOptions";

export abstract class Picker<T> {
    constructor(public data: T[], protected options: PickerOptions) {
        Object.freeze(options);
    }

    onAfterPick: ((t: T) => void) | undefined;

    abstract throwDart: (dart: number) => T | undefined;

    pickOne(): T | undefined {
        const ret = this._innerPickOne();

        if (ret !== undefined && this.onAfterPick)
            this.onAfterPick(ret);

        return ret;
    }

    private _innerPickOne(): T | undefined {
        if (this.weight == 0)
            return undefined;

        let dart = this._generateDart();

        const ret = this.throwDart(dart);

        return ret;
    }

    private _generateDart() {
        return Math.floor(Math.random() * this.weight);
    }

    abstract get weight(): number;

    put(element: T, weight: number = 1): Picker<T> {
        if (!this.data.includes(element))
            this.data.push(element);
        return this;
    }

    pick(n: number = 1, options: PickOptions = DefaultPickOptions): (T)[] {
        options = { ...DefaultPickOptions, ...options };

        let ret: T[];
        if (this.options.removeOnPick && !options.sequential) {
            ret = this._pickNormal(n);
        } else {
            if (options.unique) {
                ret = this._innerPickUnique(n);
            } else if (options.sequential) {
                ret = this._innerPickSequential(n);
            } else {
                ret = this._pickNormal(n);
            }

            if (this.onAfterPick)
                for (let r of ret)
                    this.onAfterPick(r);
        }

        return ret;
    }

    private _pickNormal(n: number) {
        let ret: (T)[] = [];
        for (let i = 0; i < n; i++) {
            const picked = this.pickOne();
            if (!picked)
                break;
            ret.push(picked);
        }
        return ret;
    }

    private _innerPickUnique(n: number) {
        let pickerTmp = this.duplicate({
            removeOnPick: true
        });

        return pickerTmp.pick(n);
    }

    private _innerPickSequential(n: number): T[] {
        let ret: T[] = [];
        if (this.data.length <= n) {
            ret = [...this.data];
        } else {
            const pickerTmp = this.duplicate();
            pickerTmp.data.splice(this.data.length - n);
            const picked = <T>pickerTmp._innerPickOne();
            const index = this.data.indexOf(picked);
            ret = this.data.slice(index, index + n);
        }

        return ret;
    }

    duplicate(options?: PickerOptions): Picker<T> {
        const newData = [...this.data];
        const newOptions = { ...this.options, ...options };
        return create(newData, newOptions);
    }

    getWeight(obj: T): number {
        return 1;
    }

    remove(obj: T): T | null {
        const index = this.data.indexOf(obj);
        if (index !== -1)
            return this.innerRemove(obj, index);

        return null;
    }

    protected innerRemove(obj: T, index: number): T | null {
        return this.data.splice(index, 1)[0];
    }

    get length(): number {
        return this.data.length;
    }
}