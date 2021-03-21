import { create } from "./CreatePicker";
import { PickerOptions } from "./PickerOptions";
import { DefaultPickOptions, PickOptions } from "./PickOptions";

export abstract class Picker<T> {
    /** @internal */
    constructor(protected _data: T[], protected options: PickerOptions) {
        Object.freeze(options);
    }

    get data(): Readonly<T[]> {
        return this._data;
    }

    /** @internal */
    protected onAfterPick: ((t: T) => void) | undefined;

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
        if (!this._data.includes(element))
            this._data.push(element);
        return this;
    }

    pick(n: number = 1, options: PickOptions = DefaultPickOptions): (T)[] {
        options = { ...DefaultPickOptions, ...options };

        if (n === 1)
            if (this.length > 0)
                return [<T>this.pickOne()];
            else
                return [];

        let ret: (T)[];
        if (this.options.removeOnPick && !options.sequential) {
            ret = this._pickNormal(n);
        } else {
            if (options.unique) {
                ret = this._innerPickUnique(n);
                this._callOnAfterPickIfDefined(ret);
            } else if (options.sequential) {
                ret = this._innerPickSequential(n);
                this._callOnAfterPickIfDefined(ret);
            } else {
                ret = this._pickNormal(n);
            }
        }

        return ret;
    }

    private _callOnAfterPickIfDefined(ret: T[]) {
        if (this.onAfterPick)
            for (let r of ret)
                this.onAfterPick(r);
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

    private _innerPickUnique(n: number): T[] {
        let pickerTmp = this.duplicate({
            removeOnPick: true
        });

        return pickerTmp.pick(n);
    }

    private _innerPickSequential(n: number): T[] {
        let ret: T[] = [];
        if (this._data.length <= n) {
            ret = [...this._data];
        } else {
            const pickerTmp = this.duplicate();
            pickerTmp._data.splice(this._data.length - n);
            const picked = <T>pickerTmp._innerPickOne();
            const index = this._data.indexOf(picked);
            ret = this._data.slice(index, index + n);
        }

        return ret;
    }

    duplicate(options?: PickerOptions): Picker<T> {
        const newData = [...this._data];
        const newOptions = { ...this.options, ...options };
        return create(newData, newOptions);
    }

    getWeight(obj: T): number | undefined {
        if (this._data.includes(obj))
            return 1;
        else
            return undefined;
    }

    remove(obj: T): T | null {
        const index = this._data.indexOf(obj);
        if (index !== -1)
            return this.innerRemove(obj, index);

        return null;
    }

    clear() {
        while (this._data.splice(0, 1).length > 0);
    }

    /** @internal */
    protected innerRemove(obj: T, index: number): T | null {
        return this._data.splice(index, 1)[0];
    }

    get length(): number {
        return this._data.length;
    }
}