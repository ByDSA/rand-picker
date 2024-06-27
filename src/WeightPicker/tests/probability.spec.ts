import { Picker } from "../Picker";
import { throwDart } from "../ThrowDart";

let picker: Picker<number>;

beforeEach(() => {
  picker = new Picker([1, 2]);

  picker.put(1, 1);
  picker.put(2, 2);
} );

it("throwDart", () => {
  const dartToObj: Record<number, number | undefined> = {};

  for (let i = -1; i < 4; i++) {
    dartToObj[i] = throwDart( {
      data: picker.data,
      dart: i,
      getWeight: picker.getWeight.bind(picker),
    } );
  }

  expect(dartToObj[-1]).toBeUndefined();
  expect(dartToObj[0]).toBe(1);
  expect(dartToObj[1]).toBe(2);
  expect(dartToObj[2]).toBe(2);
  expect(dartToObj[3]).toBeUndefined();
} );

it("probability should be 2:1", () => {
  const picks = picker.pick(10000);
  const numberOf = picks.reduce((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;

    return acc;
  }, {} as Record<number, number>);

  for (const [_key, value] of Object.entries(numberOf))
    expect(value).toBeGreaterThan(0);

  expect(numberOf[2] / numberOf[1]).toBeCloseTo(2, 0.5);
} );
