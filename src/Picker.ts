import create from "./CreatePicker";
import { PickerOptions } from "./PickerOptions";
import { DefaultPickOptions, PickOptions } from "./PickOptions";

export default abstract class Picker<T> {
  /** @internal */
  // eslint-disable-next-line no-unused-vars
  constructor(protected innerData: T[], protected options: PickerOptions) {
    Object.freeze(options);
  }

  get data(): Readonly<T[]> {
    return this.innerData;
  }

  /** @internal */
  // eslint-disable-next-line no-unused-vars
  protected onAfterPick: ((t: T) => void) | undefined;

  // eslint-disable-next-line no-unused-vars
  abstract throwDart: (dart: number) => T | undefined;

  pickOne(): T | undefined {
    const ret = this.innerPickOne();

    if (ret !== undefined && this.onAfterPick) this.onAfterPick(ret);

    return ret;
  }

  private innerPickOne(): T | undefined {
    if (this.weight === 0) return undefined;

    const dart = this.innerGenerateDart();

    const ret = this.throwDart(dart);

    return ret;
  }

  private innerGenerateDart() {
    return Math.floor(Math.random() * this.weight);
  }

  abstract get weight(): number;

  // eslint-disable-next-line no-unused-vars
  put(element: T, _weight: number = 1): Picker<T> {
    if (!this.innerData.includes(element)) this.innerData.push(element);
    return this;
  }

  pick(n: number = 1, options: PickOptions = DefaultPickOptions): T[] {
    const currentPickOptions = { ...DefaultPickOptions, ...options };

    if (n === 1) {
      if (this.length > 0) return [<T>this.pickOne()];
      return [];
    }

    let ret: T[];
    if (this.options.removeOnPick && !currentPickOptions.sequential) {
      ret = this.innerPickNormal(n);
    } else if (currentPickOptions.unique) {
      ret = this.innerPickUnique(n);
      this.innerCallOnAfterPickIfDefined(ret);
    } else if (currentPickOptions.sequential) {
      ret = this.innerPickSequential(n);
      this.innerCallOnAfterPickIfDefined(ret);
    } else {
      ret = this.innerPickNormal(n);
    }

    return ret;
  }

  private innerCallOnAfterPickIfDefined(ret: T[]) {
    if (this.onAfterPick) {
      // eslint-disable-next-line no-restricted-syntax
      for (const r of ret) this.onAfterPick(r);
    }
  }

  private innerPickNormal(n: number) {
    const ret: T[] = [];
    for (let i = 0; i < n; i++) {
      const picked = this.pickOne();
      if (!picked) break;
      ret.push(picked);
    }
    return ret;
  }

  private innerPickUnique(n: number): T[] {
    const pickerTmp = this.duplicate({
      removeOnPick: true,
    });

    return pickerTmp.pick(n);
  }

  private innerPickSequential(n: number): T[] {
    let ret: T[] = [];
    if (this.innerData.length <= n) {
      ret = [...this.innerData];
    } else {
      const pickerTmp = this.duplicate();
      pickerTmp.innerData.splice(this.innerData.length - n);
      const picked = <T>pickerTmp.innerPickOne();
      const index = this.innerData.indexOf(picked);
      ret = this.innerData.slice(index, index + n);
    }

    return ret;
  }

  duplicate(options?: PickerOptions): Picker<T> {
    const newData = [...this.innerData];
    const newOptions = { ...this.options, ...options };
    return create(newData, newOptions);
  }

  getWeight(obj: T): number | undefined {
    if (this.innerData.includes(obj)) return 1;
    return undefined;
  }

  remove(obj: T): T | null {
    const index = this.innerData.indexOf(obj);
    if (index !== -1) return this.innerRemove(obj, index);

    return null;
  }

  clear() {
    while (this.innerData.splice(0, 1).length > 0);
  }

  /** @internal */
  protected innerRemove(obj: T, index: number): T | null {
    return this.innerData.splice(index, 1)[0];
  }

  get length(): number {
    return this.innerData.length;
  }
}
