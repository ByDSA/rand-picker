import { Picker } from "./Picker";

it(`picked number is in initial data array`, () => {
    const data = [1, 2, 3, 4, 5, 6];
    const picker = new Picker(data);

    const picked = picker.pick(100);

    for (const a of picked)
        expect(data).toContain(a);
});

it(`throwDart`, () => {
    const data = [1, 2, 3, 4, 5, 6];
    const picker = new Picker(data);

    const throwed = [];
    for (let i = 0; i < 6; i++)
        throwed.push(picker.throwDart(i));

    expect(throwed).toEqual(data);
});

it(`throwDart - lower than 0`, () => {
    const data = [1, 2, 3, 4, 5, 6];
    const picker = new Picker(data);

    const throwed = picker.throwDart(-1);

    expect(throwed).toBeUndefined();
});
it(`throwDart - greater than weight`, () => {
    const data = [1, 2, 3, 4, 5, 6];
    const picker = new Picker(data);

    const throwed = picker.throwDart(10);

    expect(throwed).toBeUndefined();
});

it(`weight`, () => {
    const data = [1, 2, 3, 4, 5, 6];
    const picker = new Picker(data);

    expect(picker.weight).toBe(data.length);
});