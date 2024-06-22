import { createMaxWeightFixer } from "./MaxWeightFixer";

it("should return a function", () => {
  const fixer = createMaxWeightFixer(10);

  expect(typeof fixer).toBe("function");
} );

it("should limit the current weight to the maximum weight", () => {
  const maxWeight = 10;
  const fixer = createMaxWeightFixer(maxWeight);
  const currentWeight = 15;
  const limitedWeight = fixer(undefined, currentWeight);

  expect(limitedWeight).toBe(maxWeight);
} );

it("should not limit the current weight if it is less than the maximum weight", () => {
  const maxWeight = 10;
  const fixer = createMaxWeightFixer(maxWeight);
  const currentWeight = 5;
  const limitedWeight = fixer(undefined, currentWeight);

  expect(limitedWeight).toBe(currentWeight);
} );
