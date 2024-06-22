import { CanPick } from "../CanPick";
import { CanRemove } from "../CanRemove";
import { DefaultPickOptions, PickOptions } from "../PickOptions";
import { PickerOptions } from "../PickerOptions";
import { SimplePicker, SimplePickerPickProcess } from "../SimplePicker";
import { Filter } from "../filters";
// eslint-disable-next-line import/no-cycle
import { throwDart } from "./ThrowDart";
import { WeightFixer } from "./weight-fixers";

export class Picker<T>
implements CanPick<T>, CanRemove<T> {
  #simplePicker: SimplePicker<T>;

  /** @internal */
  private weightMap: Map<T, number>;

  constructor(
    innerData: T[],
    options?: PickerOptions,
  ) {
    this.weightMap = Object.freeze(new Map());

    this.#simplePicker = new SimplePicker(innerData, options);
  }

  filter(...filters: Filter<T>[]): T[] {
    const removed = this.#simplePicker.filter(...filters);

    removed.forEach((r) => {
      this.weightMap.delete(r);
    } );

    return removed;
  }

  fixWeights(...fixers: WeightFixer<T>[]): void {
    for (const d of this.#simplePicker.data) {
      let newWeight = this.getWeight(d) as number;

      for (const fixer of fixers)
        newWeight = fixer(d, newWeight);

      this.put(d, newWeight);
    }
  }

  onAfterPick: ((t: T)=> void) | undefined;

  pick(n: number, options?: PickOptions<T> | undefined): T[] {
    const currentPickOptions = {
      ...DefaultPickOptions,
      ...options,
    };
    const pickProcess = new SimplePickerPickProcess( {
      data: this.#simplePicker.data,
      n,
      options: currentPickOptions,
      pickerOptions: this.#simplePicker.options,
      throwDart: ( { data, dart } ) =>{
        return throwDart( {
          data,
          dart,
          getWeight: this.getWeight.bind(this),
        } );
      },
    } );
    const ret = pickProcess.pick();

    if (ret !== undefined && this.onAfterPick) {
      for (const r of ret)
        this.onAfterPick(r);
    }

    return ret;
  }

  pickOne(options?: PickOptions<T> | undefined): T | undefined {
    return this.pick(1, options)[0];
  }

  // eslint-disable-next-line accessor-pairs
  get weight(): number {
    let size = 0;

    this.#simplePicker.data.forEach((t) => {
      const tWeight = this.getWeight(t) as number;

      size += tWeight;
    } );

    return size;
  }

  put(item: T, weight: number = 1): Picker<T> {
    this.#simplePicker.put(item);

    const newWeight = Math.max(0, weight);

    this.weightMap.set(item, newWeight);

    return this;
  }

  getWeight(obj: T): number | undefined {
    let ret = this.weightMap.get(obj);

    if (ret === undefined && this.#simplePicker.data.includes(obj))
      ret = 1;

    return ret;
  }

  remove(obj: T): T | undefined {
    const removed = this.#simplePicker.remove(obj);

    if (removed) {
      this.weightMap.delete(removed);

      return removed;
    }

    return undefined;
  }

  duplicate(options?: PickerOptions): Picker<T> {
    const opts = {
      ...this.#simplePicker.options,
      ...options,
    };
    const newData = [...this.#simplePicker.data];
    const ret = new Picker(newData, opts);

    ret.weightMap = new Map(this.weightMap);

    return ret;
  }

  // eslint-disable-next-line accessor-pairs
  get data(): T[] {
    return this.#simplePicker.data;
  }

  clear() {
    this.#simplePicker.clear();
    this.weightMap.clear();
  }
}
