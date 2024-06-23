import { pickerStrings1 } from "../../WeightPicker/tests/fixtures";
import { createMinWeightFilter } from "./WeightFilter";

describe.each([
  ["A", 1, true],
  ["A", 0, true],
  ["A", 2, false],
  ["B", 2, true],
  ["D", 5, false],
  ["E", 1, true],
  ["NotWeighted", 0, false],
])("minWeightFilter function (res=%j, minWeight=%j)", (resource, minWeight, expected) => {
  it(`should return ${expected}`, () => {
    const picker = pickerStrings1();
    const filter = createMinWeightFilter(picker, minWeight);
    const result = filter(resource);

    expect(result).toBe(expected);
  } );
} );

describe.each([
  [3],
  [4],
  [5],
  [0],
])("minWeightFilter picker.filter(minWeight=%j)", (minWeight) => {
  it(`should pick only resources with weight less than or equal to ${minWeight}`, () => {
    const picker = pickerStrings1();
    const filter = createMinWeightFilter(picker, minWeight);
    const picked = picker.pick(200, {
      filters: [
        filter,
      ],
    } );

    for (const p of picked)
      expect(picker.getWeight(p)).toBeGreaterThanOrEqual(minWeight);
  } );
} );

it("should not pick anything because all elements have lower weight", () => {
  const picker = pickerStrings1();
  const filter = createMinWeightFilter(picker, 10);
  const picked = picker.pick(200, {
    filters: [
      filter,
    ],
  } );

  expect(picked).toHaveLength(0);
} );

it("should change data with filter", () => {
  const picker = pickerStrings1();
  const filter = createMinWeightFilter(picker, 3);
  const removed = picker.filter(filter);

  expect(removed).toEqual(["A", "B"]);
  expect(picker.data).toEqual(["C", "D", "E", "F"]);
} );
