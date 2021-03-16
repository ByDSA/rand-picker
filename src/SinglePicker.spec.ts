import { create } from "./Picker";
import { PickOptions } from "./PickOptions";

const data = [1, 2, 3, 4, 5, 6];
function createSample() {
    const picker = create(data);
    return picker;
}
it(`picked number is in initial data array`, () => {
    const picker = createSample();

    const picked = picker.pick(100);

    for (const a of picked)
        expect(data).toContain(a);
});

it(`throwDart`, () => {
    const picker = createSample();

    const throwed = [];
    for (let i = 0; i < 6; i++)
        throwed.push(picker.throwDart(i));

    expect(throwed).toEqual(picker.data);
});

it(`throwDart - lower than 0`, () => {
    const picker = createSample();

    const throwed = picker.throwDart(-1);

    expect(throwed).toBeUndefined();
});
it(`throwDart - greater than weight`, () => {
    const picker = createSample();

    const throwed = picker.throwDart(10);

    expect(throwed).toBeUndefined();
});

it(`weight`, () => {
    const picker = createSample();

    expect(picker.weight).toBe(picker.data.length);
});

it("picker nonunique", () => {
    const picker = createSample();

    const picked = picker.pick(30);

    expect(picked.length).toBeGreaterThan(picker.data.length);
})

it("picker unique", () => {
    const picker = createSample();

    const times = 30;
    const options: PickOptions = {
        unique: true
    };
    const picked = picker.pick(times, options);

    expect(picked.length).toBe(picker.data.length);
})


it("picker sequential", () => {
    const picker = createSample();

    const n = 2;
    const picked: number[][] = [];
    const options: PickOptions = {
        sequential: true
    };

    for (let i = 0; i < 300; i++) {
        const p = picker.pick(n, options);
        picked.push(p);
    }

    for (const p of picked) {
        expect(p.length).toBe(n);
        expect(p[1]).toBe(p[0] + 1);
        expect(p[0]).toBeLessThanOrEqual(p[1]);
    }
})