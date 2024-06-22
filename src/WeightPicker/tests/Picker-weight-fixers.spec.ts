import { Picker } from "../Picker";

it("should fix weights using the provided fixers", () => {
  const picker = new Picker([1, 2, 3]);

  picker.put(1, 2);
  picker.put(2, 4);
  picker.put(3, 6);

  const fixer1 = jest.fn((item, _weight) => item);
  const fixer2 = jest.fn((_item, weight) => weight * 2);

  picker.fixWeights(fixer1, fixer2);

  expect(fixer1).toHaveBeenCalledTimes(3);
  expect(fixer1).toHaveBeenCalledWith(1, 2);
  expect(fixer1).toHaveBeenCalledWith(2, 4);
  expect(fixer1).toHaveBeenCalledWith(3, 6);

  expect(fixer2).toHaveBeenCalledTimes(3);
  expect(fixer2).toHaveBeenCalledWith(1, 1);
  expect(fixer2).toHaveBeenCalledWith(2, 2);
  expect(fixer2).toHaveBeenCalledWith(3, 3);

  expect(picker.getWeight(1)).toBe(2);
  expect(picker.getWeight(2)).toBe(4);
  expect(picker.getWeight(3)).toBe(6);
} );
