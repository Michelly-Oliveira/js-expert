const assert = require('assert');

// ----- Keys
// userName passed in the Symbol is a description of the symbol that will be created
// an easier way to identify the symbol
const uniqueKey = Symbol('userName');
const user = {};

user['userName'] = 'value for normal Objects';
user[uniqueKey] = 'value for symbol';

// console.log('getting normal objects:', user.userName);
// // always unique at memory level
// console.log('getting normal objects:', user[Symbol('userName')]);
// console.log('getting symbol:', user[uniqueKey]);

assert.deepStrictEqual(user.userName, 'value for normal Objects');
assert.deepStrictEqual(user[Symbol('userName')], undefined);
assert.deepStrictEqual(user[uniqueKey], 'value for symbol');

// harder to access, but is not secret (not the best way to 'hide' sensible data)
// console.log('symbols', Object.getOwnPropertySymbols(user));
// console.log('symbols', Object.getOwnPropertySymbols(user)[0]);

assert.deepStrictEqual(Object.getOwnPropertySymbols(user)[0], uniqueKey);

// byPass - bad practice! Not to be used!
// Symbol.for("key") call will always return the same Symbol for a given value of "key"
user[Symbol.for('password')] = 123;
assert.deepStrictEqual(user[Symbol.for('password')], 123);

// ------ Well Known Symbols

// the way generators/iterators * work under the hood
const obj = {
	// iterators
	[Symbol.iterator]: () => ({
		items: ['c', 'b', 'a'],
		next() {
			return {
				done: this.items.length === 0,
				value: this.items.pop(),
			};
		},
	}),
};

// for (let item of obj) {
// 	console.log(item);
// }

assert.deepStrictEqual([...obj], ['a', 'b', 'c']);

const kItems = Symbol('kItems');

class MyDates {
	constructor(...args) {
		// each argument passed will be turned intro a date year/month/day
		this[kItems] = args.map(arg => new Date(...arg));
	}

	// used to replace default coercion behavior
	[Symbol.toPrimitive](coercionType) {
		if (coercionType !== 'string') {
			throw new TypeError();
		}

		const items = this[kItems].map(item =>
			new Intl.DateTimeFormat('pt-BR', {
				month: 'long',
				day: '2-digit',
				year: 'numeric',
			}).format(item)
		);

		return new Intl.ListFormat('pt-BR', { style: 'long', type: 'conjunction' }).format(items);
	}

	*[Symbol.iterator]() {
		for (const item of this[kItems]) {
			yield item;
		}
	}

	async *[Symbol.asyncIterator]() {
		const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

		for (const item of this[kItems]) {
			// simulate a code that is taking some time to execute
			await timeout(100);

			yield item.toISOString();
		}
	}

	// [object Object] -> replace Object with the value returned
	get [Symbol.toStringTag]() {
		return 'WHAT?';
	}
}

const myDates = new MyDates([2022, 04, 17], [2022, 03, 12]);

const expectedDates = [new Date(2022, 04, 17), new Date(2022, 03, 12)];

// console.log('myDates', myDates);

assert.deepStrictEqual(Object.prototype.toString.call(myDates), '[object WHAT?]');
// tries to convert to myDates to number
assert.throws(() => myDates + 1, TypeError);

// explicit coercion to string
assert.deepStrictEqual(String(myDates), '17 de maio de 2022 e 12 de abril de 2022');

assert.deepStrictEqual([...myDates], expectedDates);

// (async () => {
// 	for await (const item of myDates) {
// 		console.log('asyncIterator', item);
// 	}
// })();

(async () => {
	const dates = [];

	for await (const date of myDates) {
		dates.push(date);
	}

	const expectedDatesInISOString = expectedDates.map(item => item.toISOString());

	assert.deepStrictEqual(dates, expectedDatesInISOString);
})();
