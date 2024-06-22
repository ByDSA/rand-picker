# rand-picker

[![NPM version](http://img.shields.io/npm/v/rand-picker.svg)](https://www.npmjs.com/package/rand-picker)
[![Generic badge](https://img.shields.io/badge/GitHub-rand--picker-blue.svg?logo=github)](https://github.com/ByDSA/rand-picker)
[![CI](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/ByDSA/rand-picker/branch/main/graph/badge.svg?token=RIJ2K00E5J)](https://codecov.io/gh/ByDSA/rand-picker)

A versatile random item picker library for JavaScript. Supports weighted and non-weighted items, multiple chained filters for both added items and pick operations, single or multiple item selection, sequential and unique picking options, weight modifiers, and item removal after picking. Ideal for complex selection scenarios in games, simulations, or data processing applications.

Read [docs](https://github.com/ByDSA/rand-picker/wiki).

---

## How to use

### Basics
Install:

```bash
npm install rand-picker
```
or
```bash
pnpm install rand-picker
```

Import (ES Modules):

```js
import { Picker } from "rand-picker";
```

Create a new picker:

```js
const data = [1, 2, 3, 4, 5, 6];
const picker = new Picker(data);
```

Typing (TypeScript):

```ts
import { Picker } from "rand-picker";

const data: number[] = [1, 2, 3, 4, 5, 6];
const picker: Picker<number> = new Picker(data);
```

Pick a random item:

```js
const item1 = picker.pickOne();
const [item2] = picker.pick();
```

Pick multiple items:

```js
const items = picker.pick(40); // Picks 40 random items
```

Remove item after to be picked:

```js
const picker = new Picker(data, {
  removeOnPick: true,
});
console.log(picker.length); // 6
picker.pick(2);
console.log(picker.length); // 4
console.log(data.length); // 4
```

> _Warning: picker mutates 'data' parameter._

Apply filters to picker:
```js
const picker = new Picker([1, 2, 3, 4, 5, 6]);
const removed = picker.filter(
    (r => r % 2 === 0), // Keeps only even numbers
    (r => r > 3), // Keeps only numbers greater than 3
  );
picker.data // -> [4, 6]
removed // -> [1, 2, 3, 5]
```

Apply filters on pick:
```js
const picker = new Picker([1, 2, 3, 4, 5, 6]);

const picked = picker.pick(4, {
  filters: [
    (r => r % 2 === 0), // Keeps only even numbers
    (r => r > 3), // Keeps only numbers greater than 3
  ],
});
picked // 4 numbers, all of them are 4 or 6
picker.data // [1, 2, 3, 4, 5, 6]. Data not modified
```

### Weighted picker
```js
import { WeightPicker } from "rand-picker";

const picker = new WeightPicker(["A", "B"]);

picker.getWeight("A"); // Returns 1
picker.weight; // Returns 2

picker.put("A", 25); // Replace weight of 'A' with 25
picker.put("B", 25); // Replace weight of 'B' with 25
picker.put("C", 50); // Put 'C' with weight = 50

picker.getWeight("A"); // Returns 25
picker.weight; // Returns 100
```

> _Note: it's not necessary to sum up 100, weights are relative about the items._

Weight Fixers:
```js
const picker = new WeightPicker(["A", "B"]);
picker.put("A", 1);
picker.put("B", 2);

picker.fixWeights(
  (item, weight) => weight * 2, // Doubles all weights
  (item, weight) => weight + 1 // Adds 1 to all weights
);

picker.getWeight("A"); // Returns 3, because 1*2 + 1
picker.getWeight("B"); // Returns 5, because 2*2 + 1
```
### Options on pick

- unique:

```js
picker.pick(5, {
  unique: true,
}); // Gets 5 unique items
console.log(data.length); // 6. Doesn't modify data array

const items = picker.pick(10, {
  unique: true,
}); // Tries to get 10 unique items
console.log(items.length); // 6. 'data' has only 6 unique values
```

- sequential:

```js
picker.pick(2, {
  sequential: true,
}); // Gets a pair of sequential items: [1, 2], [2, 3], [3, 4], [4, 5] or [5, 6]
```

> _Note: both options can be combined._

### Other functions

```js
picker.data // Returns data array (mutable)

picker.length // Returns data length

picker.remove(obj) // Removes 'obj' from picker and returns it

picker.duplicate(options?) // Returns a picker copy, with a new data and weight arrays

```

### Secure random

```js
const picker = new Picker(data, {
  randomMode: RandomMode.SECURE,
});

const picked = picker.pick(6);
```

### Picker inside another picker

```js
const innerPicker = new WeightPicker([])
  .put("B", 2) //   Prob = 2/5 (inside this picker)
  .put("C", 3); //  Prob = 3/5 (inside this picker)

const innerPicker2 = new WeightPicker([])
  .put("D", 3) //   Prob = 3/10 (inside this picker)
  .put("E", 7); //  Prob = 7/10 (inside this picker)

const picker = new WeightPicker([])
  .put("A") //                Prob = 1/21
  .put(innerPicker, 10) //    Prob = 10/21
  .put(innerPicker2, 10); //  Prob = 10/21

const darts = Array.from(Array(21).keys()); // 0, 1, ..., 20
const dartProcess = new WeightPickerDartProcess();
const distribution = darts.map((i) => dartProcess.throwDart( {
    dart: i,
    data: picker.data,
    getWeight: picker.getWeight.bind(picker),
  } ));
console.log(distribution);
// 'A',                                 => Prob(A) = 1/21
// 'B', 'B', 'B', 'B',                  => Prob(B) = 4/21
// 'C', 'C', 'C', 'C', 'C', 'C',        => Prob(C) = 6/21
// 'D', 'D', 'D',                       => Prob(D) = 3/21
// 'E', 'E', 'E', 'E', 'E', 'E', 'E'    => Prob(E) = 7/21
```

---

©2024 Daniel Sales Álvarez <danisales.es@gmail.com>
