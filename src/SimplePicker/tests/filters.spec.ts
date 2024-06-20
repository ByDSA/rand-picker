import { dependencyFilter } from "../../filters";
import { pickerNumbers1 } from "./fixtures";

it("should always return 2 after pick 1", () => {
  const picker = pickerNumbers1();
  const genFilter = dependencyFilter<number>( {
    dependencies: [
      [1, 2],
    ],
  } );
  const picked: number[] = [];
  let last = undefined;

  for (let i = 0; i < 300; i++) {
    const ret = picker.pickOne( {
      filters: [genFilter(last)],
    } );

    if (ret) {
      picked.push(ret);
      last = ret;
    }
  }

  let cases = 0;

  for (let i = 0; i < picked.length - 1; i++) {
    const p = picked[i];
    const pNext = picked[i + 1];

    if (p === 1) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(pNext).toBe(2);
      cases++;
    }
  }

  expect(cases).toBeGreaterThan(0);
} );
