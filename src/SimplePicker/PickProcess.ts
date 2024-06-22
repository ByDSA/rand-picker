import { PickOptions } from "../PickOptions";
import { PickerOptions } from "../PickerOptions";
import { ThrowDartFn } from "../ThrowDartFn";
import { generateRandomInteger } from "../random";

export type PickProcessProps<T, TD extends ThrowDartFn<T>> = {
  n: number;
  data: T[];
  onAfterPick?: ((t: T)=> void);
  pickerOptions: Required<PickerOptions>;
  options: PickOptions<T>;
  throwDart: TD;
};

export class PickProcess<T, TD extends ThrowDartFn<T>> {
  #props: PickProcessProps<T, TD>;

  constructor(props: PickProcessProps<T, TD>) {
    this.#props = props;

    if (props.options.filters)
      this.#props.data = [...this.#props.data];
  }

  #applyFiltersToData() {
    const { data } = this.#props;
    const { filters } = this.#props.options;

    if (!filters)
      return;

    const pickData = [];

    for (const item of data) {
      if (filters.every((filter) => filter(item)))
        pickData.push(item);
    }

    this.#props.data = pickData;
  }

  pick() {
    let ret: T[] = [];
    let originalData = this.#props.data;

    if (this.#props.options.filters)
      this.#applyFiltersToData();

    if (this.#props.n === 1) {
      const picked = this.#pickOne();

      if (picked !== undefined) {
        this.#props.onAfterPick?.(picked);

        ret = [picked];
      } else
        ret = [];
    } else {
      const { options } = this.#props;
      const { n } = this.#props;

      if (this.#props.pickerOptions.removeOnPick && !options.sequential)
        ret = this.#pickNAndCallOnAfter(n);
      else if (options.unique)
        ret = this.#pickNUniqueAndCallOnAfter(n);
      else if (options.sequential) {
        ret = this.#pickNSequential(n);
        this.#callOnAfterPick(ret);
      } else
        ret = this.#pickNAndCallOnAfter(n);
    }

    if (this.#props.options.filters)
      this.#props.data = originalData;

    return ret;
  }

  #callOnAfterPick(ret: T[]) {
    for (const r of ret)
      this.#props.onAfterPick?.(r);
  }

  #pickNAndCallOnAfter(n: number) {
    const ret: T[] = [];

    for (let i = 0; i < n; i++) {
      const picked = this.#pickOne();

      if (!picked)
        break;

      this.#props.onAfterPick?.(picked);

      ret.push(picked);
    }

    return ret;
  }

  #pickNUniqueAndCallOnAfter(n: number): T[] {
    const ret: T[] = [];
    const { data: originalData } = this.#props;
    const dataTmp = [...originalData];

    this.#props.data = dataTmp;

    for (let i = 1; i <= n; i++) {
      if (dataTmp.length === 0)
        return ret;

      const dart = generateRandomInteger( {
        max: dataTmp.length,
        randomMode: this.#props.pickerOptions.randomMode,
      } );
      const [picked] = dataTmp.splice(dart, 1);

      this.#props.onAfterPick?.(picked);

      ret.push(picked!);
    }

    this.#props.data = originalData;

    return ret;
  }

  #pickOne(): T | undefined {
    if (this.#props.data.length === 0)
      return undefined;

    const dart = generateRandomInteger( {
      max: this.#props.data.length,
      randomMode: this.#props.pickerOptions.randomMode,
    } );
    const ret = this.#props.throwDart( {
      data: this.#props.data,
      dart,
    } );

    return ret;
  }

  #pickNSequential(n: number): T[] {
    let ret: T[] = [];
    const { data } = this.#props;

    if (data.length <= n)
      ret = [...data];
    else {
      const end = data.splice(data.length - n); // Para que el primer item tenga n item siguientes
      const picked = this.#pickOne() as T;

      data.push(...end);
      const index = data.indexOf(picked);

      ret = data.slice(index, index + n);
    }

    return ret;
  }
}
