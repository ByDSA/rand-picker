import { Picker as AbstractPicker } from "./Picker";

export class SinglePicker<T> extends AbstractPicker<T> {
  throwDart = (dart: number): T | undefined => this.innerData[dart];

  get weight(): number {
    return this.innerData.length;
  }
}
