import { createMaxWeightFixer } from "./MaxWeightFixer";
import { WeightFixer } from "./WeightFixer";

export const createSafeIntegerMaxWeightFixer: (dataLength: number)=> WeightFixer<unknown> = (
  dataLength: number,
)=> {
  return createMaxWeightFixer(Number.MAX_SAFE_INTEGER / dataLength);
};
