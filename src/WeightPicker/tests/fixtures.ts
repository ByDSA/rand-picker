import { SimplePicker } from "../../SimplePicker";
import { Picker } from "../Picker";

let pickerNumbersData1: number[];
let pickerStringsData1: string[];
let pickerCompountDataInnerPicker1: number[];
let pickerCompountDataInnerPicker2: number[];

export function resetData() {
  pickerNumbersData1 = [1, 2, 3, 4, 5, 6];
  pickerStringsData1 = ["A", "B", "C", "D", "E", "F"];
  pickerCompountDataInnerPicker1 = [1, 2];
  pickerCompountDataInnerPicker2 = [3, 4, 5];
}

resetData();

export function genDartProcessParams<T>(picker: Picker<T>, dart: number) {
  return {
    data: picker.data,
    dart,
    getWeight: picker.getWeight.bind(picker),
  };
}

export function pickerNumbers1() {
  const picker = new Picker(pickerNumbersData1);

  for (let i = 1; i <= 6; i++)
    picker.put(i, i);

  return picker;
}

export function pickerStrings1() {
  const picker = new Picker<string>(pickerStringsData1);

  picker.put("A", 1);
  picker.put("B", 2);
  picker.put("C", 3);
  picker.put("D", 4);
  picker.put("E", 5);
  picker.put("F", 6);

  return picker;
}

export function pickerCompound1() {
  const innerPicker1 = new Picker(pickerCompountDataInnerPicker1);

  innerPicker1.put(1, 2);
  innerPicker1.put(2, 3);
  const innerPicker2 = new SimplePicker(pickerCompountDataInnerPicker2);
  const picker = new Picker([0, innerPicker1, innerPicker2, 6]);

  picker.put(innerPicker1, 10);
  picker.put(innerPicker2, 6);
  picker.put(6, 3);

  return picker;
}
