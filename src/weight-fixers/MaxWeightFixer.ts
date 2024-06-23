import { WeightFixer } from "../WeightFixer";

export const createMaxWeightFixer: (maxWeight: number)=> WeightFixer<unknown> = (
  maxWeight: number,
)=> {
  return (_: unknown, currentWeight: number)=> {
    return Math.min(maxWeight, currentWeight);
  };
};
