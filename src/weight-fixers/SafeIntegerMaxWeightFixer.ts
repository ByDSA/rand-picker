import { WeightFixer } from "../WeightFixer";
import { createMaxWeightFixer } from "./MaxWeightFixer";

export const createSafeIntegerMaxWeightFixer: (dataLength: number)=> WeightFixer<unknown> = (
  dataLength: number,
)=> {
  return createMaxWeightFixer(Number.MAX_SAFE_INTEGER / dataLength);
};
