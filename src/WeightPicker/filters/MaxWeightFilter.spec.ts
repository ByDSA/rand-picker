import { pickerStrings1 } from "../tests/fixtures";
import { maxWeightFilter } from "./WeightFilter";

describe.each([
  ["A", 3, true],
  ["B", 3, true],
  ["D", 3, false],
  ["E", 5, true],
  ["NotWeighted", Number.MAX_VALUE, false],
])("maxWeightFilter function (res=%j, maxWeight=%j)", (resource, maxWeight, expected) => {
  it(`should return ${expected}`, () => {
    const picker = pickerStrings1();
    const filter = maxWeightFilter(picker, maxWeight);
    const result = filter(resource);

    expect(result).toBe(expected);
  } );
} );

describe.each([
  [3],
  [4],
  [5],
  [0],
])("maxWeightFilter picker.filter(maxWeight=%j)", (maxWeight) => {
  it(`should pick only resources with weight less than or equal to ${maxWeight}`, () => {
    const picker = pickerStrings1();
    const filter = maxWeightFilter(picker, maxWeight);
    const picked = picker.pick(200, {
      filters: [
        filter,
      ],
    } );

    for (const p of picked)
      expect(picker.getWeight(p)).toBeLessThanOrEqual(maxWeight);
  } );
} );

it("should not pick anything because all elements have greater weight", () => {
  const picker = pickerStrings1();
  const filter = maxWeightFilter(picker, 0);
  const picked = picker.pick(200, {
    filters: [
      filter,
    ],
  } );

  expect(picked).toHaveLength(0);
} );

it("should change data with filter", () => {
  const picker = pickerStrings1();
  const filter = maxWeightFilter(picker, 2);
  const removed = picker.filter(filter);

  expect(picker.data).toEqual(["A", "B"]);
  expect(removed).toEqual(["C", "D", "E", "F"]);
} );
