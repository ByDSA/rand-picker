import { pickerNumbers1 } from "./fixtures";

it("should keep only even numbers", () => {
  const picker = pickerNumbers1();
  const picked = picker.pick(200, {
    filters: [
      (r => r % 2 === 0),
    ],
  } );

  for (const p of picked)
    expect(p % 2).toBe(0);
} );

it("should keep only even numbers greather than 3", () => {
  const picker = pickerNumbers1();
  const picked = picker.pick(200, {
    filters: [
      (r => r % 2 === 0),
      (r => r > 3),
    ],
  } );

  for (const p of picked) {
    expect(p % 2).toBe(0);
    expect(p > 3).toBe(true);
  }
} );
