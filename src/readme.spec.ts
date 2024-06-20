import { weightPickerThrowDart } from "./WeightPicker";
import { Picker, RandomMode, WeightPicker } from ".";

function newPickerSample() {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = new Picker(data);

  return picker;
}

it("create a new picker", () => {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = new Picker(data);

  expect(picker).toBeDefined();
} );

it("typing", () => {
  const data: number[] = [1, 2, 3, 4, 5, 6];
  const picker: Picker<number> = new Picker(data);

  expect(picker).toBeDefined();
} );

it("pick a random item", () => {
  const picker = newPickerSample();
  const item1 = picker.pickOne();
  const [item2] = picker.pick();

  expect(item1).toBeDefined();
  expect(item2).toBeDefined();
} );

it("pick multiple items", () => {
  const picker = newPickerSample();
  const items = picker.pick(40); // Picks 40 random items

  expect(items.length).toBe(40);
} );

it("remove item after to be picked", () => {
  const data: number[] = [1, 2, 3, 4, 5, 6];
  const picker = new Picker(data, {
    removeOnPick: true,
  } );

  picker.pick(2);
  expect(picker.length).toBe(4); // 4
  expect(data.length).toBe(4); // 4
} );

it("weighted picker", () => {
  const picker = new WeightPicker(["A", "B"]);

  expect(picker.getWeight("A")).toBe(1);
  picker.put("A", 25); // Edits weight of 'A' to 25
  expect(picker.getWeight("A")).toBe(25);
  expect(picker.getWeight("B")).toBe(1);
  picker.put("B", 25); // Edits weight of 'B' to 25
  expect(picker.getWeight("B")).toBe(25);
  expect(picker.getWeight("C")).toBeUndefined();
  picker.put("C", 50); // Add 'C' and puts its height to 50
  expect(picker.getWeight("C")).toBe(50);
} );

it("options on pick: unique", () => {
  const data = [1, 2, 3, 4, 5, 6];
  const picker = new Picker(data);
  const ret = picker.pick(5, {
    unique: true,
  } ); // gets 5 unique items

  expect(ret.length).toBe(5);
  expect(data.length).toBe(6); // 6. Don't modify data array

  const items = picker.pick(10, {
    unique: true,
  } ); // tries to get 10 unique items

  expect(items.length).toBe(6); // 6. 'data' has only 6 unique values
} );

it("options on pick: sequential", () => {
  const picker = newPickerSample();
  const ret = picker.pick(2, {
    sequential: true,
  } ); // gets a pair of sequential items: [1, 2], [2, 3], [3, 4], [4, 5] or [5, 6]
  const possibilities = [
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 5],
    [5, 6],
  ];

  expect(possibilities).toContainEqual(ret);
} );

it("picker inside another picker", () => {
  const innerPicker = new WeightPicker<string>([])
    .put("B", 2)
    .put("C", 3);
  const innerPicker2 = new WeightPicker<string>([])
    .put("D", 3)
    .put("E", 7);
  const picker = new WeightPicker<WeightPicker<string> | string>([])
    .put("A")
    .put(innerPicker, 10)
    .put(innerPicker2, 10);
  const darts = Array.from(Array(21).keys()); // 0, 1, ..., 20
  const distribution = darts.map((i) => weightPickerThrowDart( {
    dart: i,
    data: picker.data,
    getWeight: picker.getWeight.bind(picker),
  } ));
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
} );

it("random secure", () => {
  const picker = new Picker([1, 2, 3, 4, 5, 6], {
    randomMode: RandomMode.SECURE,
  } );
  const picked = picker.pick(6);

  expect(picked).toBeDefined();
} );
