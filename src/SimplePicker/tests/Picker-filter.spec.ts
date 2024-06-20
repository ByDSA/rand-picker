import { pickerNumbers1, resetData } from "./fixtures";

beforeEach(() => {
  resetData();
} );
it("should keep only 1", () => {
  const picker = pickerNumbers1();
  const removed = picker.filter((r => r === 1));

  expect(removed).toEqual([2, 3, 4, 5, 6]);

  expect(picker.data).toEqual([1]);
} );

it("should keep only odd numbers", () => {
  const picker = pickerNumbers1();
  const removed = picker.filter((r => r % 2 === 0));

  expect(removed).toEqual([1, 3, 5]);
  expect(picker.data).toEqual([2, 4, 6]);
} );

it("should keep only odd numbers greater than 3", () => {
  const picker = pickerNumbers1();
  const removed = picker.filter(
    (r => r % 2 === 0),
    (r => r > 3),
  );

  expect(removed).toEqual([1, 2, 3, 5]);
  expect(picker.data).toEqual([4, 6]);
} );
