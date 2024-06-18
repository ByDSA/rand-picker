import create from "./CreatePicker";

function createSample() {
  const picker = create([1, 2, 3, 4, 5, 6], {
    weighted: true,
  } );

  for (let i = 1; i <= 6; i++)
    picker.put(i, i);

  return picker;
}

function createCompoundSample() {
  const innerPicker1 = create([1, 2], {
    weighted: true,
  } );

  innerPicker1.put(1, 2);
  innerPicker1.put(2, 3);
  const innerPicker2 = create([3, 4, 5]);
  const picker = create([0, innerPicker1, innerPicker2, 6], {
    weighted: true,
  } );

  picker.put(innerPicker1, 10);
  picker.put(innerPicker2, 6);
  picker.put(6, 3);

  return picker;
}
it("weight", () => {
  const picker = createSample();

  expect(picker.weight).toBe(21);
} );

it("weight - compoundSample", () => {
  const picker = createCompoundSample();

  expect(picker.weight).toBe(20);
} );
it("throwDart", () => {
  const picker = createSample();

  expect(picker.throwDart(0)).toBe(1);
  expect(picker.throwDart(1)).toBe(2);
  expect(picker.throwDart(2)).toBe(2);
  expect(picker.throwDart(4)).toBe(3);
  expect(picker.throwDart(8)).toBe(4);
  expect(picker.throwDart(20)).toBe(6);
} );

it("throwDart - if invalid value", () => {
  const picker = createSample();
  const ret = picker.throwDart(30);

  expect(ret).toBeUndefined();
} );
it("throwDart - if data empty", () => {
  const picker = createSample();

  picker.clear();
  const ret = picker.throwDart(0);

  expect(ret).toBeUndefined();
} );

it("throwDart - picker inside picker", () => {
  const picker = createCompoundSample();

  picker.clear();
  const ret = picker.throwDart(0);

  expect(ret).toBeUndefined();
} );

it("throwDart - if compind picker", () => {
  const picker = createCompoundSample();
  const throwings = [];

  for (let i = 0; i <= 21; i++)
    throwings.push(picker.throwDart(i));

  expect(throwings[0]).toBe(0);
  expect(throwings[4]).toBe(1);
  expect(throwings[5]).toBe(2);
  expect(throwings[13]).toBe(4);
  expect(throwings[20]).toBeUndefined();
} );

it("duplicate", () => {
  const picker = createSample();
  const picker2 = picker.duplicate();

  picker.put(2, 20);
  picker.remove(3);
  expect(picker2.getWeight(2)).toBe(2);
  expect(picker2.data.includes(3)).toBeTruthy();
} );

it("duplicate - opt: weight=false", () => {
  const picker = createSample();
  const picker2 = picker.duplicate( {
    weighted: false,
  } );

  picker.put(2, 20);
  expect(picker2.getWeight(2)).toBe(1);
} );

it("put - without weight", () => {
  const picker = createSample();

  picker.put(7);
  expect(picker.getWeight(7)).toBe(1);
  expect(picker.data.includes(7)).toBeTruthy();
} );

it("remove", () => {
  const picker = createSample();

  picker.remove(2);
  expect(picker.data.includes(2)).toBeFalsy();
} );
