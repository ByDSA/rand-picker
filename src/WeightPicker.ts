import { Picker } from "./Picker";
import { PickerOptions } from "./PickerOptions";

export class WeightPicker<T> extends Picker<T> {
    private weightMap: Map<T, number>;

    constructor(_data: T[], options: PickerOptions) {
        super(_data, options);
        this.weightMap = new Map();
        Object.freeze(this.weightMap);
    }

    throwDart = (dart: number): T | undefined => {
        if (this._data.length === 0)
            return undefined;

        const { accumulated, dartTarget } = this.getTargetAtDart(dart);

        if (dartTarget instanceof Picker) {
            const externalWeight = <number>this.getWeight(dartTarget);
            const internalWeight = dartTarget.weight;
            const fixedDart = Math.floor((dart - accumulated) / externalWeight * internalWeight);
            return dartTarget.throwDart(fixedDart);
        } else if (dartTarget !== undefined)
            return dartTarget;
        else
            return undefined;
    }

    private getTargetAtDart(dart: number) {
        let accumulated = 0;
        let dartTarget: T | undefined;
        for (let t of this._data) {
            const tWeight = <number>this.getWeight(t);
            accumulated += tWeight;
            if (dart < accumulated) {
                dartTarget = t;
                accumulated -= tWeight;
                return {
                    dartTarget,
                    accumulated
                }
            }
        }

        return {
            dartTarget,
            accumulated,
        }
    }

    get weight(): number {
        let size = 0;
        for (let t of this._data) {
            const tWeight = <number>this.getWeight(t);
            size += tWeight;
        }

        return size;
    }

    put(obj: T, weight: number = 1): Picker<T> {
        super.put(obj);
        weight = Math.max(0, weight);
        this.weightMap.set(obj, weight);

        return this;
    }

    getWeight(obj: T): number | undefined {
        let ret = this.weightMap.get(obj);
        if (ret === undefined && this._data.includes(obj))
            ret = 1;

        return ret;
    }

    duplicate(options?: PickerOptions): Picker<T> {
        let opts = { ...this.options, ...options };
        const ret = super.duplicate(options);
        if (opts.weighted)
            (<WeightPicker<T>>ret).weightMap = new Map(this.weightMap);
        return ret;
    }

    protected innerRemove(obj: T, index: number): T | null {
        const ret = super.innerRemove(obj, index);
        this.weightMap.delete(obj);
        return ret;
    }
}