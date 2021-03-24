import { RandomMode } from "./RandomMode";

export type PickerOptions = {
  removeOnPick?: boolean;
  weighted?: boolean;
  randomMode?: RandomMode;
};

export const DefaultPickerOptions: PickerOptions = {
  removeOnPick: false,
  weighted: false,
  randomMode: RandomMode.MATH_RANDOM,
};
