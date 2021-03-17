import { create } from "./CreatePicker";
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

it('if already has a value', () => {
    const picker = create(['A', 'B']);
    const initial = picker.data[0];
    picker.put(initial);
    expect(picker.length).toBe(2);
    const current = picker.data[0];

    expect(current).toBe(initial);
});

it('remove element', () => {
    const picker = create(['A', 'B']);
    expect(picker.data.includes('A')).toBeTruthy();
    const ret = picker.remove('A');
    expect(ret).toBe('A');
    expect(picker.data.includes('A')).toBeFalsy();
});

it('remove element - not found', () => {
    const picker = create(['A', 'B']);
    expect(picker.data.includes('C')).toBeFalsy();
    const ret = picker.remove('C');
    expect(ret).toBeNull();
    expect(picker.data.includes('C')).toBeFalsy();
});

it('getWeight', () => {
    const picker = createSample();
    const w = picker.getWeight(3);
    expect(w).toBe(1);
});

it('getWeight - element not found', () => {
    const picker = createSample();
    const w = picker.getWeight(7);
    expect(w).toBeUndefined();
});

it('custom on afterpick', () => {
    const picker = createSample();
    let counter = 0;
    (<any>picker).onAfterPick = (e: number) => {
        counter++;
    }

    picker.pick(123);
    expect(counter).toBe(123);
});

it('throwDart', () => {
    const picker = createSample();
    const ret = picker.throwDart(3);
    expect(ret).toBe(4);
});

it('throwDart - if invalid value', () => {
    const picker = createSample();
    const ret = picker.throwDart(7);
    expect(ret).toBeUndefined();
});
it('throwDart - if data empty', () => {
    const picker = create([]);
    const ret = picker.throwDart(0);
    expect(ret).toBeUndefined();
});

it('clear', () => {
    const picker = createSample();
    picker.clear();
    expect(picker.length).toBe(0);
});