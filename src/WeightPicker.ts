import { Picker } from "./Picker";
import { PickerOptions } from "./PickerOptions";

export class WeightPicker<T> extends Picker<T> {
    private weightMap: Map<T, number> = new Map();

    throwDart = (dart: number): T | undefined => {
        if (this.data.length === 0)
            return undefined;

        const { accumulated, dartTarget } = this.getTargetAtDart(dart);

        if (dartTarget instanceof Picker)
            return dartTarget.throwDart(dart - accumulated);
        else if (dartTarget)
            return dartTarget;
        else
            return undefined;
    }

    private getTargetAtDart(dart: number) {
        let accumulated = 0;
        let dartTarget: T | undefined;
        for (let t of this.data) {
            const tWeight = this.getWeight(t);
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
        for (let t of this.data) {
            const tWeight = this.getWeight(t);
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

    getWeight(obj: T): number {
        return this.weightMap.get(obj) || super.getWeight(obj);
    }

    duplicate(options?: PickerOptions): Picker<T> {
        const ret = super.duplicate(options);
        if (options?.weighted) {
            (<WeightPicker<T>>ret).weightMap = new Map(this.weightMap);
        }
        return ret;
    }
}