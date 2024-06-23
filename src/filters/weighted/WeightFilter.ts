import { Picker } from "../../WeightPicker/Picker";

type FilterFn<R> = (resource: R, weight: number)=> boolean;
export const createWeightFilter = <R>(
  picker: Picker<R>,
  filter: FilterFn<R>,
) => {
  return (resource: R) => {
    const weight = picker.getWeight(resource);

    if (weight === undefined)
      return false;

    return filter(resource, weight);
  };
};

export const createMinWeightFilter = <R>(
  picker: Picker<R>,
  minWeight: number,
) => {
  return createWeightFilter(picker, (_, weight) => weight >= minWeight);
};

export const maxWeightFilter = <R>(
  picker: Picker<R>,
  maxWeight: number,
) => {
  return createWeightFilter(picker, (_, weight) => weight <= maxWeight);
};
