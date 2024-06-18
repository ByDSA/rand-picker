import AbstractPicker from "./Picker";

export default class SinglePicker<T> extends AbstractPicker<T> {
  throwDart = (dart: number): T | undefined => this.innerData[dart];

  get weight(): number {
    return this.innerData.length;
  }
}
