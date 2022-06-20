const assert = require('assert');

// Set is used mostly when we need to deal with Lists that contain unique values (no duplicates)

const array1 = ['0', '1', '2'];
const array2 = ['2', '0', '3'];
const array3 = array1.concat(array2);
// console.log(array3.sort());
assert.deepStrictEqual(array3.sort(), ['0', '0', '1', '2', '2', '3']);

const set = new Set();
array1.map(item => set.add(item));
array2.map(item => set.add(item));
// console.log(set);
assert.deepStrictEqual(Array.from(set), ['0', '1', '2', '3']);
assert.deepStrictEqual(Array.from(new Set([...array1, ...array2])), ['0', '1', '2', '3']);

// console.log('set.keys', set.keys());
// console.log('set.values', set.values());

// Array -> to know if an element exists:
// [].indexOf('1') !== -1 or [0].includes(0)
assert.ok(set.has('3'));

// Same theory as Map, but
// With Set, you always work with the whole list (not just one element)

const users01 = new Set(['Harry', 'Hermione', 'Ron']);

const users02 = new Set(['Luna', 'Lupin', 'Harry']);

// get elements that exist on both sets
const intersection = new Set([...users01].filter(user => users02.has(user)));
assert.deepStrictEqual(Array.from(intersection), ['Harry']);

// get elements that exist only on users01
const difference = new Set([...users01].filter(user => !users02.has(user)));
assert.deepStrictEqual(Array.from(difference), ['Hermione', 'Ron']);

const user = { id: 123 };
const user2 = { id: 321 };

const weakSet = new WeakSet([user]);
// weakSet.add(user2)
// weakSet.delete(user2)
// weakSet.has(user2)
