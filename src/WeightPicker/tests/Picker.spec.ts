import { pickerCompound1, pickerNumbers1, resetData } from "./fixtures";

const sum1ToN = (n: number) => (n * (n + 1)) / 2;

beforeEach(() => {
  resetData();
} );

it("should return total weight", () => {
  const picker = pickerNumbers1();
  const expectedSUm = sum1ToN(6); // 21

  expect(picker.weight).toBe(expectedSUm);
} );

it("should return correct weight", () => {
  const picker = pickerNumbers1();
  const weightOf2 = picker.getWeight(2);

  expect(weightOf2).toBe(2);
} );

it("duplicate", () => {
  const picker = pickerNumbers1();
  const picker2 = picker.duplicate();

  picker.put(2, 20);
  picker.remove(3);
  expect(picker2.getWeight(2)).toBe(2);
  expect(picker2.data.includes(3)).toBeTruthy();
} );
describe("put", () => {
  it("should return weight=1 as default (non input weight)", () => {
    const picker = pickerNumbers1();

    expect(picker.getWeight(7)).toBeUndefined();
    picker.put(7);
    expect(picker.getWeight(7)).toBe(1);
  } );

  it("should return introduces weight", () => {
    const picker = pickerNumbers1();

    picker.put(7, 3);
    expect(picker.getWeight(7)).toBe(3);
  } );
} );
describe("remove", () => {
  it("should decrease weight", () => {
    const picker = pickerNumbers1();
    const expectedWeight = picker.weight - 2; // 19

    picker.remove(2);
    expect(picker.weight).toBe(expectedWeight);
  } );

  it("should not return the weight anymore", () => {
    const picker = pickerNumbers1();

    picker.remove(2);
    expect(picker.getWeight(2)).toBeUndefined();
  } );
} );

describe("compound", () => {
  it("weight", () => {
    const picker = pickerCompound1();

    expect(picker.weight).toBe(20);
  } );
} );
