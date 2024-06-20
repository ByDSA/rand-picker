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
