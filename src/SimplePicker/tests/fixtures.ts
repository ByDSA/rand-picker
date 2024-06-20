import { Picker } from "../Picker";

export let pickerNumbersData1: number[];

export let pickerStringsData1: string[];

export function resetData() {
  pickerNumbersData1 = [1, 2, 3, 4, 5, 6];

  pickerStringsData1 = ["A", "B"];
}
resetData();

export function genDartProcessParams<T>(picker: Picker<T>, dart: number) {
  return {
    data: picker.data,
    dart,
  };
}

export function pickerNumbers1() {
  const picker = new Picker(pickerNumbersData1);

  return picker;
}

export function pickerRemoveNumbers1() {
  const picker = new Picker(pickerNumbersData1, {
    removeOnPick: true,
  } );

  return picker;
}

export function pickerStrings1() {
  const picker = new Picker(pickerStringsData1);

  return picker;
}

export function pickerRemoveStrings1() {
  const picker = new Picker(pickerStringsData1, {
    removeOnPick: true,
  } );

  return picker;
}
