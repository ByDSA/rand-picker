import { Picker } from "../Picker";
import { throwDart } from "../ThrowDart";
import { genDartProcessParams, pickerNumbers1 } from "./fixtures";

describe("dartProcess", () => {
  it("throwDart", () => {
    const picker = pickerNumbers1();
    const throwed = [];

    for (let i = 0; i < 6; i++)
      throwed.push(throwDart(genDartProcessParams(picker, i)));

    expect(throwed).toEqual(picker.data);
  } );

  it("lower than 0", () => {
    const picker = pickerNumbers1();
    const throwed = throwDart(genDartProcessParams(picker, -1));

    expect(throwed).toBeUndefined();
  } );
  it("greater than weight", () => {
    const picker = pickerNumbers1();
    const throwed = throwDart(genDartProcessParams(picker, 10));

    expect(throwed).toBeUndefined();
  } );

  it("throwDart2", () => {
    const picker = pickerNumbers1();
    const ret = throwDart(genDartProcessParams(picker, 3));

    expect(ret).toBe(4);
  } );

  it("if invalid value", () => {
    const picker = pickerNumbers1();
    const ret = throwDart(genDartProcessParams(picker, 7));

    expect(ret).toBeUndefined();
  } );
  it("if data empty", () => {
    const picker = new Picker([]);
    const ret = throwDart(genDartProcessParams(picker, 0));

    expect(ret).toBeUndefined();
  } );
} );
