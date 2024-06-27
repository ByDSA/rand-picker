import { pickerNumbers1, resetData } from "./fixtures";
beforeEach(() => {
  resetData();
} );

it("should get weight of sum of individual weights", () => {
  const picker = pickerNumbers1();

  expect(picker.weight).toBe(21);
} );

it("should update total weight without removed elements", () => {
  const picker = pickerNumbers1();

  // eslint-disable-next-line max-len
  // Se llama a picker.weight en todos los tests para que internamente se precalcule y se utilice #precalcWeight
  expect(picker.weight).toBe(21);

  picker.remove(3);
  picker.remove(6);

  expect(picker.weight).toBe(21 - 3 - 6);
} );

it("should update total weight with updated individual weight", () => {
  const picker = pickerNumbers1();

  expect(picker.weight).toBe(21);

  picker.put(3, 1);
  picker.put(5, 1);

  expect(picker.weight).toBe(21 - 3 + 1 - 5 + 1);
} );

it("should update total weight with added individual weight", () => {
  const picker = pickerNumbers1();

  expect(picker.weight).toBe(21);

  picker.put(7, 7);

  expect(picker.weight).toBe(21 + 7);
} );

it("should update total weight with weight fixers", () => {
  const picker = pickerNumbers1();

  expect(picker.weight).toBe(21);

  picker.fixWeights((w) => w + 1);

  expect(picker.weight).toBe(21 + 6);
} );

it("should only consider non removed items by filters", () => {
  const picker = pickerNumbers1();

  expect(picker.weight).toBe(21);

  picker.filter((r) => r % 2 === 0);

  expect(picker.weight).toBe(2 + 4 + 6);
} );
