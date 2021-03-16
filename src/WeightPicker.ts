import { AbstractPicker } from "./AbstractPicker";

type WeightableMultilevel<T> = Weightable<T> | AbstractPicker<WeightableMultilevel<T>, T>;
export class WeightPicker<T> extends AbstractPicker<WeightableMultilevel<T>, T> {
    throwDart(dart: number): T | undefined {
        if (this.data.length === 0)
            return undefined;

        const { accumulated, dartTarget } = this.getTargetAtDart(dart);

        if (dartTarget instanceof AbstractPicker)
            return dartTarget.throwDart(dart - accumulated);
        else if (dartTarget)
            return dartTarget.get();
        else
            return undefined;
    }

    private getTargetAtDart(dart: number) {
        let accumulated = 0;
        let dartTarget: WeightableMultilevel<T> | undefined;
        for (let t of this.data) {
            accumulated += Math.max(0, t.weight);
            if (dart < accumulated) {
                dartTarget = t;
                accumulated -= t.weight;
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
            size += Math.max(t.weight, 0);
        }

        return size;
    }
}

export class WeightWrapper<T> {
    constructor(private _obj: T, public weight: number = 1) {
    }

    get(): T {
        return this._obj;
    }
}

export function wrap<T>(e: T, weight: number = 1) {
    return new WeightWrapper(e, weight);
}

export interface Weightable<T> {
    weight: number;
    get(): T;
}