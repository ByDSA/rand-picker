import create from "./CreatePicker";
import { PickOptions } from "./PickOptions";

const data = [1, 2, 3, 4, 5, 6];

function createSample() {
  const picker = create([...data], {
    removeOnPick: true,
  } );

  return picker;
}
it("picked number disappears from picker", () => {
  const picker = createSample();
  const picked = picker.pickOne();

  expect(picker.data).not.toContain(picked);
  expect(picker.length).toBe(5);
} );

it("pick all", () => {
  const picker = createSample();

  picker.pick(data.length);
  expect(picker.length).toBe(0);
} );

it("pick more than all", () => {
  const picker = createSample();

  picker.pick(data.length);
  const picked = picker.pickOne();

  expect(picked).toBeUndefined();
  expect(picker.length).toBe(0);
} );

it("picker unique", () => {
  const picker = createSample();
  const times = 30;
  const options: PickOptions = {
    unique: true,
  };
  const picked = picker.pick(times, options);

  expect(picked.length).toBe(data.length);
} );

it("picker sequential", () => {
  const picker = createSample();
  const n = 2;
  const picked: number[][] = [];
  const options: PickOptions = {
    sequential: true,
  };

  for (let i = 0; i < 300; i++) {
    const p = picker.pick(n, options);

    if (p.length === 0)
      break;

    expect(p.length).toBe(2);
    picked.push(p);
  }

  expect(picked[0][1]).toBe(picked[0][0] + 1);

  expect(picked.length).toBe(3);
  picked.forEach((p) => {
    expect(p.length).toBe(n);
    expect(p[0]).toBeLessThanOrEqual(p[1]);
  } );
} );

it("pick if picker is empty", () => {
  const picker = createSample();

  picker.pick(6);
  expect(picker.length).toBe(0);
  const ret = picker.pick();

  expect(ret).toEqual([]);
} );

it("pickOne if picker is empty", () => {
  const picker = createSample();

  picker.pick(6);
  expect(picker.length).toBe(0);
  const ret = picker.pickOne();

  expect(ret).toBeUndefined();
} );

it("pick if picker has only one item", () => {
  const picker = createSample();

  picker.pick(5);
  expect(picker.length).toBe(1);
  const ret = picker.pick();

  expect(ret).toBeDefined();
} );
