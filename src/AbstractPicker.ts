export type PickerOptions = {
    removeOnPick: boolean;
}

export const DefaultPickerOptions: PickerOptions = {
    removeOnPick: false
}

// TODO: doesn't work yet
export type PickOptions = {
    unique: boolean;
    sequential: boolean;
}

export const DefaultPickOptions: PickOptions = {
    unique: false,
    sequential: false
}

export abstract class AbstractPicker<DATA, PICK_TYPE = DATA> {
    constructor(protected data: DATA[], options: PickerOptions = DefaultPickerOptions) {
    }

    onAfterPick: ((t: PICK_TYPE) => void) | undefined;

    abstract throwDart(dart: number): PICK_TYPE | undefined;

    pickOne(): PICK_TYPE | undefined {
        if (this.weight == 0)
            return undefined;

        let dart = Math.floor(Math.random() * this.weight);

        const ret = this.throwDart(dart);

        if (ret && this.onAfterPick)
            this.onAfterPick(ret);

        return ret;
    }

    get weight(): number {
        return this.data.length;
    }

    pick(n: number = 1, options: PickOptions = DefaultPickOptions): (PICK_TYPE)[] {
        let ret: (PICK_TYPE)[] = [];
        for (let i = 0; i < n; i++) {
            const picked = this.pickOne();
            if (picked)
                ret.push(picked);
        }
        return ret;
    }
}