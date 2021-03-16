import { create } from "./CreatePicker";

function generatePicker() {
    const picker = create([1, 2, 3, 4, 5, 6], {
        weighted: true
    });

    for (let i = 1; i <= 6; i++)
        picker.put(i, i);

    return picker;
}
it('weight', () => {
    const picker = generatePicker();

    expect(picker.weight).toBe(21);
});
it(`throwDart`, () => {
    const picker = generatePicker();

    expect(picker.throwDart(0)).toBe(1);
    expect(picker.throwDart(1)).toBe(2);
    expect(picker.throwDart(2)).toBe(2);
    expect(picker.throwDart(4)).toBe(3);
    expect(picker.throwDart(8)).toBe(4);
    expect(picker.throwDart(20)).toBe(6);
});