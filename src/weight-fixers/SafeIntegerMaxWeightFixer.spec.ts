import { createSafeIntegerMaxWeightFixer } from "./SafeIntegerMaxWeightFixer";

it("should return a function that returns the max safe integer divided by the data length", () => {
  const dataLength = 10;
  const fixer = createSafeIntegerMaxWeightFixer(dataLength);
  const newWeight = fixer(undefined, Number.MAX_SAFE_INTEGER);

  expect(newWeight).toBe(Number.MAX_SAFE_INTEGER / dataLength);
} );

it("should return a function that does not change the weight if it is less than the max safe integer divided by the data length", () => {
  const dataLength = 10;
  const fixer = createSafeIntegerMaxWeightFixer(dataLength);
  const previousWeight = 1234567;
  const newWeight = fixer(undefined, previousWeight);

  expect(newWeight).toBe(previousWeight);
} );
