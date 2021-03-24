import AbstractPicker from "./Picker";

export default class SinglePicker<T> extends AbstractPicker<T> {
  throwDart = (dart: number): T | undefined => this.innerData[dart];

  // eslint-disable-next-line no-unused-vars
  onAfterPick: ((t: T) => void) | undefined;

  get weight(): number {
    return this.innerData.length;
  }
}
