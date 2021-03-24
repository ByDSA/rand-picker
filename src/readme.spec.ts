/* eslint-disable no-unused-vars */
import { newPicker, Picker } from ".";
import create from "./CreatePicker";
import { RandomMode } from "./RandomMode";

function newPickerSample() {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = newPicker(data);

  return picker;
}

it("create a new picker", () => {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = newPicker(data);
});

it("typing", () => {
  const data: number[] = [1, 2, 3, 4, 5, 6];
  const picker: Picker<number> = newPicker(data);
});

it("pick a random element", () => {
  const picker = newPickerSample();
  const element1 = picker.pickOne();
  const [element2] = picker.pick();
});

it("pick multiple elements", () => {
  const picker = newPickerSample();
  const elements = picker.pick(40); // Picks 40 random elements
  expect(elements.length).toBe(40);
});

it("remove element after to be picked", () => {
  const data: number[] = [1, 2, 3, 4, 5, 6];
  const picker = newPicker(data, {
    removeOnPick: true,
  });
  picker.pick(2);
  expect(picker.length).toBe(4); // 4
  expect(data.length).toBe(4); // 4
});

it("weighted picker", () => {
  const picker = newPicker(["A", "B"], {
    weighted: true,
  });
  expect(picker.getWeight("A")).toBe(1);
  picker.put("A", 25); // Edits weight of 'A' to 25
  expect(picker.getWeight("A")).toBe(25);
  expect(picker.getWeight("B")).toBe(1);
  picker.put("B", 25); // Edits weight of 'B' to 25
  expect(picker.getWeight("B")).toBe(25);
  expect(picker.getWeight("C")).toBeUndefined();
  picker.put("C", 50); // Add 'C' and puts its height to 50
  expect(picker.getWeight("C")).toBe(50);
});

it("options on pick: unique", () => {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = newPicker(data);
  const ret = picker.pick(5, {
    unique: true,
  }); // gets 5 unique elements
  expect(ret.length).toBe(5);
  expect(data.length).toBe(6); // 6. Don't modify data array

  const elements = picker.pick(10, {
    unique: true,
  }); // tries to get 10 unique elements
  expect(elements.length).toBe(6); // 6. 'data' has only 6 unique values
});

it("options on pick: sequential", () => {
  const picker = newPickerSample();
  const ret = picker.pick(2, {
    sequential: true,
  }); // gets a pair of sequential elements: [1, 2], [2, 3], [3, 4], [4, 5] or [5, 6]

  const possibilities = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
  ];
  expect(possibilities).toContainEqual(ret);
});

it("picker inside another picker", () => {
  const innerPicker = newPicker<string>([], {
    weighted: true,
  })
    .put("B", 2)
    .put("C", 3);
  const innerPicker2 = newPicker<string>([], {
    weighted: true,
  })
    .put("D", 3)
    .put("E", 7);

  const picker = newPicker<string | Picker<string>>([], {
    weighted: true,
  })
    .put("A")
    .put(innerPicker, 10)
    .put(innerPicker2, 10);

  const darts = Array.from(Array(21).keys()); // 0, 1, ..., 20
  const distribution = darts.map((i) => picker.throwDart(i));
  const expected = [
    "A",
    "B",
    "B",
    "B",
    "B",
    "C",
    "C",
    "C",
    "C",
    "C",
    "C",
    "D",
    "D",
    "D",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
    "E",
  ];
  expect(distribution).toEqual(expected);
});

it("random secure", () => {
  const picker = create([1, 2, 3, 4, 5, 6], {
    randomMode: RandomMode.SECURE,
  });

  const picked = picker.pick(6);
});
