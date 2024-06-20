import { RandomMode } from "./RandomMode";

export type PickerOptions = {
  removeOnPick?: boolean;
  randomMode?: RandomMode;
};

export const DefaultPickerOptions: Required<PickerOptions> = {
  removeOnPick: false,
  randomMode: RandomMode.MATH_RANDOM,
};
