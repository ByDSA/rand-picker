import { Picker } from "../Picker";

it("probability should be the same for all", () => {
  const picker = new Picker([1, 2, 3, 4]);
  const picks = picker.pick(10000);
  const numberOf = picks.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;

    return acc;
  }, {} as Record<number, number>);
  const entries: [string, number][] = Object.entries(numberOf);

  for (const [_key, value] of entries)
    expect(value).toBeGreaterThan(0);

  for (const [_key, value] of entries)
    expect(entries[0][1] / value).toBeCloseTo(1, 0.5);
} );
