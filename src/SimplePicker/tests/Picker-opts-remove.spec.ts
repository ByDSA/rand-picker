/* eslint-disable prefer-destructuring */

import { PickOptions } from "../../PickOptions";
import { pickerNumbersData1, pickerRemoveNumbers1, pickerRemoveStrings1, pickerStringsData1, resetData } from "./fixtures";

beforeEach(() => {
  resetData();
} );

it("picked numbers are not within initial data array", () => {
  const picker = pickerRemoveNumbers1();
  const picked = picker.pick(pickerNumbersData1.length - 2);

  picked.forEach((a) => {
    expect(pickerNumbersData1).not.toContain(a);
  } );
} );

it("picked length is reduced", () => {
  const picker = pickerRemoveNumbers1();
  const initialLength = picker.length;

  picker.pickOne();

  expect(picker.length).toBe(initialLength - 1);
} );

it("picker length matches data array length", () => {
  const picker = pickerRemoveNumbers1();

  expect(picker.length).toBe(picker.data.length);
} );

it("on trying to pick more items than existing in the picker, picked elements length should be the same as initial data array length", () => {
  const picker = pickerRemoveNumbers1();
  const times = pickerNumbersData1.length + 2;
  const initialDataLength = picker.data.length;
  const picked = picker.pick(times);

  expect(picked.length).toBe(initialDataLength);
  expect(pickerNumbersData1.length).toBe(0);
} );

describe("put", ()=>{
  it("should add an element", () => {
    const picker = pickerRemoveNumbers1();

    picker.put(7);
    expect(picker.length).toBe(7);
    expect(picker.data.at(-1)).toBe(7);

    // Should mutate the original data
    expect(pickerNumbersData1.length).toBe(7);
  } );

  it("picker should not re-add an existing element", () => {
    const picker = pickerRemoveStrings1();
    const initial = picker.data[0];

    picker.put(initial);
    expect(picker.length).toBe(2);
    const current = picker.data[0];

    expect(current).toBe(initial);
  } );
} );

describe("remove item tests", () => {
  it("successfully removes existing item", () => {
    const picker = pickerRemoveStrings1();

    expect(picker.data.includes("A")).toBeTruthy();
    const ret = picker.remove("A");

    expect(ret).toBe("A");
    expect(picker.data.includes("A")).toBeFalsy();

    // Should mutate the original data
    expect(pickerStringsData1.includes("A")).toBeFalsy();
  } );

  it("returns undefined when trying to remove non-existing item", () => {
    const picker = pickerRemoveStrings1();

    expect(picker.data.includes("C")).toBeFalsy();
    const ret = picker.remove("C");

    expect(ret).toBeUndefined();
  } );

  it("picker should be cleared", () => {
    const picker = pickerRemoveNumbers1();

    picker.clear();
    expect(picker.length).toBe(0);

    // Should mutate the original data
    expect(pickerNumbersData1.length).toBe(0);
  } );
} );

it("custom onAfterpick", () => {
  const picker = pickerRemoveNumbers1();
  let counter = 0;

  picker.onAfterPick = () => {
    counter++;
  };

  picker.pick(123);
  expect(counter).toBe(123);
} );

describe("pick options = unique", () => {
  it("picker unique", () => {
    const picker = pickerRemoveNumbers1();
    const times = 30;
    const initialLength = picker.data.length;
    const options = {
      unique: true,
    };
    const picked = picker.pick(times, options);

    expect(picked.length).toBe(initialLength);
  } );
} );

describe("pick options = sequential", () => {
  it("on data.length=6 and n=2, should only pick 3 groups of 2", () => {
    const picker = pickerRemoveNumbers1();
    const n = 2;
    const picked: number[][] = [];
    const options: PickOptions<number> = {
      sequential: true,
    };

    for (let i = 0; i < 300; i++) {
      const p = picker.pick(n, options);

      if (p.length === 0)
        break;

      expect(p.length).toBe(2);
      picked.push(p);
    }

    expect(picked.length).toBe(3);
    expect(picked[0][1]).toBe(picked[0][0] + 1);

    picked.forEach((p) => {
      expect(p.length).toBe(n);
      expect(p[0]).toBeLessThanOrEqual(p[1]);
    } );
  } );
} );
