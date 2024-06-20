import { CanPick } from "../CanPick";
import { CanRemove } from "../CanRemove";
import { DefaultPickOptions, PickOptions } from "../PickOptions";
import { DefaultPickerOptions, PickerOptions } from "../PickerOptions";
import { Filter } from "../filters";
import { PickProcess } from "./PickProcess";
import { throwDart } from "./ThrowDart";

export class Picker<T> implements CanPick<T>, CanRemove<T> {
  #options: Required<PickerOptions>;

  /** @internal */
  constructor(
      protected innerData: T[],
      options?: PickerOptions,
  ) {
    this.#options = Object.freeze( {
      ...DefaultPickerOptions,
      ...options,
    } );

    if (this.#options.removeOnPick) {
      this.onAfterPick = (picked: T): void => {
        this.remove(picked);
      };
    }
  }

  filter(...filters: Filter<T>[]): T[] {
    const removed: T[] = [];

    for (let i = 0; i < this.innerData.length; i++) {
      const item = this.innerData[i];

      if (filters.some(filter => !filter(item))) {
        const r = this.innerData.splice(i, 1);

        removed.push(r[0]);
        i--;
      }
    }

    return removed;
  }

  onAfterPick: ((t: T)=> void) | undefined;

  pick(n: number = 1, options: PickOptions<T> = DefaultPickOptions): T[] {
    const currentPickOptions = {
      ...DefaultPickOptions,
      ...options,
    };
    const pickProcess = new PickProcess( {
      data: this.innerData,
      n,
      onAfterPick: this.onAfterPick,
      options: currentPickOptions,
      pickerOptions: this.#options,
      throwDart: throwDart,
    } );
    const ret = pickProcess.pick();

    return ret;
  }

  pickOne(options?: PickOptions<T>): T | undefined {
    return this.pick(1, options)[0];
  }

  put(item: T): Picker<T> {
    if (!this.innerData.includes(item))
      this.innerData.push(item);

    return this;
  }

  remove(obj: T): T | undefined {
    const index = this.innerData.indexOf(obj);

    if (index !== -1)
      return this.innerData.splice(index, 1)[0];

    return undefined;
  }

  clear() {
    while (this.innerData.splice(0, 1).length > 0)
      ;
  }

  // eslint-disable-next-line accessor-pairs
  get length(): number {
    return this.innerData.length;
  }

  duplicate(options?: PickerOptions): Picker<T> {
    const newData = [...this.innerData];
    const newOptions = {
      ...this.#options,
      ...options,
    };

    return new Picker<T>(newData, newOptions);
  }

  // eslint-disable-next-line accessor-pairs
  get data(): T[] {
    return this.innerData;
  }

  // eslint-disable-next-line accessor-pairs
  get options(): Readonly<Required<PickerOptions>> {
    return this.#options;
  }
}
