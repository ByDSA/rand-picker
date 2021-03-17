# rand-picker

[![NPM version](http://img.shields.io/npm/v/rand-picker.svg)](https://www.npmjs.com/package/rand-picker)
[![CI](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml/badge.svg)](https://github.com/ByDSA/rand-picker/actions/workflows/ci.yml)
[![Coverage Status](https://coveralls.io/repos/github/ByDSA/rand-picker/badge.svg?branch=main)](https://coveralls.io/github/ByDSA/rand-picker?branch=main&service=github)
![GitHub top language](https://img.shields.io/github/languages/top/ByDSA/rand-picker)
![NPM](https://img.shields.io/npm/l/rand-picker)
[![Generic badge](https://img.shields.io/badge/GitHub-rand--picker-orange.svg?logo=github)](https://github.com/ByDSA/rand-picker)

A powerful Random Picker of elements with many options. Easy to use.

- - -
## How to use

Install:
```bash
npm install rand-picker
```

Import (ES Modules):
```js
import { newPicker } from "rand-picker";
```

Create a new picker:
```js
let data = [1, 2, 3, 4, 5, 6];
let picker = newPicker(data);
```

Typing (TypeScript):
```ts
import { newPicker, Picker } from "rand-picker";

let data: number[] = [1, 2, 3, 4, 5, 6];
let picker: Picker<number> = newPicker(data);
```

Pick a random element:
```js
let element1 = picker.pickOne();
let [element2] = picker.pick();
```

Pick multiple elements:
```js
let elements = picker.pick(40); // Picks 40 random elements
```

Remove element after to be picked:
```js
let picker = newPicker(data, {
    removeOnPick: true
});
picker.pick(2);
console.log(picker.length); // 4
console.log(data.length); // 4
```
> _Warning: picker mutates 'data' parameter._

Weighted picker:
```js
let picker = newPicker(['A', 'B'], {
    weighted: true
});
picker.put('A', 25); // Edits weight of 'A' to 25
picker.put('B', 25); // Edits weight of 'B' to 25
picker.put('C', 50); // Add 'C' and puts its height to 50
```
> _Note: it's not necessary to sum up 100, weights are relative about the elements._

> _Note 2: added weights does nothing if 'weighted' option is not enabled._

Options on pick:
* unique:
```js
picker.pick(5, {
    unique: true
}); // gets 5 unique elements
console.log(data.length); // 6. Don't modify data array

let elements = picker.pick(10, {
    unique: true
}); // tries to get 10 unique elements
console.log(elements.length); // 6. 'data' has only 6 unique values
```
* sequential:
```js
picker.pick(2, {
    sequential: true
}); // gets a pair of sequential elements: [1, 2], [2, 3], [3, 4], [4, 5] or [5, 6]
```
> _Note: both options can be combined._

Other functions:
```js
picker.throwDart(num); // Gives 'num' between 0 and weight, returns the determinated element for that number.

picker.weight // Returns total picker weights

picker.length // Return data length

picker.getWeight(obj) // Returns the assigned weight for 'obj'

picker.duplicate(options?) // Return a picker copy, with a new data and weight arrays

picker.remove(obj) // Removes 'obj' from picker and returns it
```

> _Note: if weights are not enabled, it takes all them as 1 for weight-related functions._
- - -
Daniel Sales Álvarez. 2021.