# rand-picker

[![NPM version](http://img.shields.io/npm/v/rand-picker.svg)](https://www.npmjs.com/package/rand-picker)
[![Generic badge](https://img.shields.io/badge/GitHub-rand--picker-blue.svg?logo=github)](https://github.com/ByDSA/rand-picker)
[![CI](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ByDSA/rand-picker/branch/main/graph/badge.svg?token=RIJ2K00E5J)](https://codecov.io/gh/ByDSA/rand-picker)

A powerful Random Picker of elements with many options. Easy to use.

Read [docs](https://github.com/ByDSA/rand-picker/wiki).

---

## How to use

### Basics

Install (npm):

```bash
npm install rand-picker
```

Import (ES Modules):

```js
import { newPicker } from "rand-picker";
```

Create a new picker:

```js
const data = [1, 2, 3, 4, 5, 6];
const picker = newPicker(data);
```

Typing (TypeScript):

```ts
import { newPicker, Picker } from "rand-picker";

const data: number[] = [1, 2, 3, 4, 5, 6];
const picker: Picker<number> = newPicker(data);
```

Pick a random element:

```js
const element1 = picker.pickOne();
const [element2] = picker.pick();
```

Pick multiple elements:

```js
const elements = picker.pick(40); // Picks 40 random elements
```

Remove element after to be picked:

```js
const picker = newPicker(data, {
  removeOnPick: true,
});
console.log(picker.length); // 6
picker.pick(2);
console.log(picker.length); // 4
console.log(data.length); // 4
```

> _Warning: picker mutates 'data' parameter._

Weighted picker:

```js
const picker = newPicker(["A", "B"], {
  weighted: true,
});
picker.put("A", 25); // Edits weight of 'A' to 25
picker.put("B", 25); // Edits weight of 'B' to 25
picker.put("C", 50); // Adds 'C' and puts its height to 50
```

> _Note: it's not necessary to sum up 100, weights are relative about the elements._

> _Note 2: added weights does nothing if 'weighted' option is not enabled._

### Options on pick

- unique:

```js
picker.pick(5, {
  unique: true,
}); // Gets 5 unique elements
console.log(data.length); // 6. Doesn't modify data array

const elements = picker.pick(10, {
  unique: true,
}); // Tries to get 10 unique elements
console.log(elements.length); // 6. 'data' has only 6 unique values
```

- sequential:

```js
picker.pick(2, {
  sequential: true,
}); // Gets a pair of sequential elements: [1, 2], [2, 3], [3, 4], [4, 5] or [5, 6]
```

> _Note: both options can be combined._

### Other functions

```js
picker.weight // Returns total picker weights

picker.length // Returns data length

picker.getWeight(obj) // Returns the assigned weight for 'obj'

picker.duplicate(options?) // Returns a picker copy, with a new data and weight arrays

picker.remove(obj) // Removes 'obj' from picker and returns it

picker.throwDart(num); // Gives 'num' between 0 and weight, returns the determinated element for that number.
```

> _Note: if weights are not enabled, it takes all them as 1 for weight-related functions._

### Secure random

```js
const picker = newPicker(data, {
  randomMode: RandomMode.SECURE,
});

const picked = picker.pick(6);
```

### Picker inside another picker

```js
const innerPicker = newPicker([], {
  weighted: true,
})
  .put("B", 2) //   Prob = 2/5 (inside this picker)
  .put("C", 3); //  Prob = 3/5 (inside this picker)

const innerPicker2 = newPicker([], {
  weighted: true,
})
  .put("D", 3) //   Prob = 3/10 (inside this picker)
  .put("E", 7); //  Prob = 7/10 (inside this picker)

const picker = newPicker([], {
  weighted: true,
})
  .put("A") //                Prob = 1/21
  .put(innerPicker, 10) //    Prob = 10/21
  .put(innerPicker2, 10); //  Prob = 10/21

const darts = Array.from(Array(21).keys()); // 0, 1, ..., 20
const distribution = darts.map((i) => picker.throwDart(i));
console.log(distribution);
// 'A',                                 => Prob(A) = 1/21
// 'B', 'B', 'B', 'B',                  => Prob(B) = 4/21
// 'C', 'C', 'C', 'C', 'C', 'C',        => Prob(C) = 6/21
// 'D', 'D', 'D',                       => Prob(D) = 3/21
// 'E', 'E', 'E', 'E', 'E', 'E', 'E'    => Prob(E) = 7/21
```

---

??2021 Daniel Sales ??lvarez <danisales.es@gmail.com>
