import { Picker } from "../Picker";
import { pickerStrings1 } from "./fixtures";

it("should keep only odd letters", () => {
  const picker = pickerStrings1();
  const picked = picker.pick(200, {
    filters: [
      (r => {
        const w = picker.getWeight(r);

        if (w === undefined)
          return false;

        return w % 2 === 0;
      } ),
    ],
  } );

  for (const p of picked)
    expect(p).toMatch(/[bdfhjlnprtvxz]/i);
} );

it("should keep only odd letters greather than 3", () => {
  const picker = pickerStrings1();
  const picked = picker.pick(200, {
    filters: [
      (r => {
        const w = picker.getWeight(r);

        if (w === undefined)
          return false;

        return w % 2 === 0;
      } ),
      (r => {
        const w = picker.getWeight(r);

        if (w === undefined)
          return false;

        return w > 3;
      } ),
    ],
  } );

  for (const p of picked)
    expect(p).toMatch(/[bdfhjlnprtvxz]/i);
} );

it("should pick probability 2:1", () => {
  const picker = new Picker([1, 2, 3, 4, 5]);

  for (const d of picker.data)
    picker.put(d, d);

  const n = 10000;
  const picked = picker.pick(n, {
    filters: [
      (r => {
        const w = picker.getWeight(r);

        if (w === undefined)
          return false;

        return w <= 2;
      } ),
    ],
  } );

  expect(picker.weight).toBe(15);

  expect(picked.length).toBe(n);

  for (const p of picked)
    expect([1, 2].includes(p)).toBeTruthy();

  const countOf1 = picked.filter(x => x === 1).length;
  const countOf2 = picked.filter(x => x === 2).length;

  expect(countOf2 / countOf1).toBeCloseTo(2, 0.5);
} );
