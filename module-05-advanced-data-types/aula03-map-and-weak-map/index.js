const assert = require('assert');

const myMap = new Map();

// can have any data type as key/value
myMap
	.set(1, 'one')
	.set('Majima', { text: 'Goro' })
	.set(true, () => 'Hello There');

// using the constructor
const myMapWithConstructor = new Map([
	['1', 'string'],
	[2, 'num'],
	[true, 'bool'],
]);

// console.log('myMap', myMap);
// console.log('myMap.get(1)', myMap.get(1));

assert.deepStrictEqual(myMap.get(1), 'one');
assert.deepStrictEqual(myMap.get('Majima'), { text: 'Goro' });
assert.deepStrictEqual(myMap.get(true)(), 'Hello There');

// Objects only strings can be used as keys

const onlyReferenceWorks = { id: 1 };

// Doesn't work - value reference
// myMap.set({ id: 1 }, { name: 'Kiryu' });

// Address reference
myMap.set(onlyReferenceWorks, { name: 'Kiryu' });

// console.log('get', myMap.get(onlyReferenceWorks));

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined);
assert.deepStrictEqual(myMap.get(onlyReferenceWorks), { name: 'Kiryu' });

// Utilities

// Amount of props:
// Object -> Object.keys({id: 1}).length
assert.deepStrictEqual(myMap.size, 4);

// Check if prop exists
// Object -> item.key (undefined)
// if() = implicit coercion to boolean - returns false
// correct way: ({name: 'Kiryu'}).hasOwnProperty
assert.ok(myMap.has(onlyReferenceWorks));

// Remove prop
// Object -> delete item.key
// not good for performance
// map.delete -> returns true if prop was found and deleted, false otherwise
assert.ok(myMap.delete(onlyReferenceWorks));

// Iterate
// Object -> can't iterate through an object (Object.entries)
assert.deepStrictEqual(
	JSON.stringify([...myMap]),
	JSON.stringify([
		[1, 'one'],
		['Majima', { text: 'Goro' }],
		[true, () => {}],
	])
);

// for (const [key, value] of myMap) {
// 	console.log({ key, value });
// }

// Object is not secure: depending on the name of the prop(key), it can override
// a default behavior
// ({}).toString === [object Object]
// ({toString: () => "Hey"}) === "Hey"
// any name can collide with high level props, like:
// constructor, toString, valueOf, etc

const character = {
	name: 'Majima Goro',
	toString: 'Mad Dog of Shimano',
};

myMap.set(character);

assert.ok(myMap.has(character));
// doesn't override the default toString method
assert.throws(() => myMap.get(character).toString(), TypeError);

// Objects can't be 'cleared' without re-assigning it
myMap.clear();
assert.deepStrictEqual([...myMap.keys()], []);

// --------------------------------------------------------------

// WeakMap
// most of Map's benefits
// BUT: is not iterable
// Only keys by reference (that you already know)
// ligher and prevents memory leak, because after the instances are garbage collected,
// everthing is cleaned up, removed - WeakMap no longer has access to them

const weakMap = new WeakMap();
const hero = { name: 'Wolverine' };

// API -  delete, get, has, set
// weakMap.set(hero)
// weakMap.get(hero)
// weakMap.delete(hero)
// weakMap.has(hero)
