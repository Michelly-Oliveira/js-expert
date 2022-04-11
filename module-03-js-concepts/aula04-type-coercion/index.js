// true + 2 // -> 3
// true - 2 // -> -1
// '21' + true // -> '21true'
// '21' - true // -> 20
// 999999999999999 // -> 10000000000000000 (nine 16 times)
// 0.1 + 0.2 // -> 0.30000000000000004
// 0.1 + 0.2 === 0.3 // -> false
// 3 > 2 // -> true
// 2 > 1 // -> true
// 3 > 2 > 1 // -> false
// '21' -- 1 // -> '22'

// '1' == 1 // -> true
// '1' === 1 // -> false
// 3 > 2 >= 1 // -> false

// "B" + "a" + + "a" + "a" // -> 'BaNaNa'

// String(123) // -> '123'
// 123 + '' // -> '123'

// --------------------------------------------------------

console.assert(String(123) === '123', 'explicit convertion to string');
console.assert('' + 123 === '123', 'implicit convertion to string');

// null -> false
// 1 -> true
// if true or false
// if (null || 1) {
// 	console.log('hey');
// }

// if ('hey' || 1) {
// 	console.log('hey 2');
// }

// if both values/expressions are true, the first argument is returned
const word = 'hello' || 1;
// console.log('word', word);

console.assert(
	'hello' || 123 === 'hello',
	'|| if both values are true, the first argument is returned'
);
console.assert(('hello' && 123) === 123, '&& returns the last element if both values are true');

// ------------------------------------------------------------------------------------------------

const item = {
	name: 'Michelly',
	age: 21,
	toString() {
		return `Name: ${this.name}, Age: ${this.age}`;
	},
	valueOf() {
		// return { test: 'not a number' }; // -> Nan
		return 007;
	},
	// max priority, comes before all others
	[Symbol.toPrimitive](coercionType) {
		// console.log('trying to convert to', coercionType);

		const types = {
			string: JSON.stringify(this),
			number: 007,
		};

		return types[coercionType] || types.string;
	},
};

// There is a priority order depending on the type of coercion
// if it's a number type, for example, it will first call the valueOf, and if that does not return a primitive (number), call the toString
// if it's a string type, for example, it will first call the toString, and if that does not return a primitive (string), call the valueOf

// Calls object's toString to convert its value to a string
// [object Object]0 -> if we don't replace the object's default toString
// console.log('item', item + 0);
// console.log('item', 'concat '.concat(item));

// console.log('string', String(item));
// // returns Nan if the valueOf is not a primitive number, because then it calls toString, wich is also not a number
// console.log('number', Number(item));
// // trying to convert to default -> boolean (since there are three types of coercion: to string, to number, to boolean)
// console.log('Date', new Date(item));

console.assert(item + 0 === '{"name":"Michelly","age":21}0');

console.assert(!!item);
// console.log('is !!item true?', !!item);

console.assert('here '.concat(item) === 'here {"name":"Michelly","age":21}');
// console.log('concat string', 'here '.concat(item));

console.assert(item == String(item));
// console.log('implicit + explicit', item == String(item));

const item2 = { ...item, name: 'Vergil', age: 20 };
// console.log('New object', item2);
console.assert(item2.name === 'Vergil' && item2.age === 20);
