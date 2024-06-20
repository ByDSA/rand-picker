import { Picker } from "../Picker";
import { throwDart } from "../ThrowDart";
import { genDartProcessParams, pickerCompound1, pickerNumbers1 } from "./fixtures";

it("shoult get expected values on throwDart", () => {
  const picker = pickerNumbers1();
  const genParams = (dart: number) => genDartProcessParams(picker, dart);

  expect(throwDart(genParams(0))).toBe(1);
  expect(throwDart(genParams(1))).toBe(2);
  expect(throwDart(genParams(2))).toBe(2);
  expect(throwDart(genParams(4))).toBe(3);
  expect(throwDart(genParams(8))).toBe(4);
  expect(throwDart(genParams(20))).toBe(6);
} );

it("shuld return undefined if dart number is grater or equal than weight", () => {
  const picker = pickerNumbers1();
  const ret = throwDart(genDartProcessParams(picker, picker.weight));

  expect(ret).toBeUndefined();
} );

it("should return undefined if array data is empty", () => {
  const picker = new Picker<number>([]);
  const ret = throwDart(genDartProcessParams(picker, 0));

  expect(ret).toBeUndefined();
} );

describe("compound", () => {
  it("shoult get expected values on throwDart", () => {
    const picker = pickerCompound1();
    const throwings = [];

    for (let i = 0; i <= picker.weight + 1; i++)
      throwings.push(throwDart(genDartProcessParams(picker, i)));

    expect(throwings[0]).toBe(0);
    expect(throwings[4]).toBe(1);
    expect(throwings[5]).toBe(2);
    expect(throwings[13]).toBe(4);
    expect(throwings[picker.weight]).toBeUndefined();
  } );
} );
