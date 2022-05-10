const assert = require('assert');

function* calculation(arg1, arg2) {
	yield arg1 * arg2;
}

function* main() {
	yield 'hello';
	yield 'test';

	// need to use the *, otherwise the code will not be executed at that time (only afterwards)
	yield* calculation(20, 10);
}

const generator = main();
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());
// console.log(generator.next());

assert.deepStrictEqual(generator.next(), { value: 'hello', done: false });
assert.deepStrictEqual(generator.next(), { value: 'test', done: false });
assert.deepStrictEqual(generator.next(), { value: 200, done: false });
assert.deepStrictEqual(generator.next(), { value: undefined, done: true });

// console.log('Array.from', Array.from(main()));
assert.deepStrictEqual(Array.from(main()), ['hello', 'test', 200]);
assert.deepStrictEqual([...main()], ['hello', 'test', 200]);

// ------------------------------------------------------------------------------
const { readFile, stat, readdir } = require('fs/promises');

function* promises() {
	yield readFile(__filename);
	yield Promise.resolve('Hello There');
}

// [...promises()] -> array of results from generator
// Promise.all([...promises()]).then(result => console.log('promises', result));

// (async () => {
// 	for await (const item of promises()) {
// 		console.log('for await', item.toString());
// 	}
// })();

async function* systemInfo() {
	const file = await readFile(__filename);
	yield { file: file.toString() };

	const { size } = await stat(__filename);
	yield { size };

	const { dir } = await readdir(__dirname);
	yield { dir };
}

(async () => {
	for await (const item of systemInfo()) {
		console.log('systemInfo', item);
	}
})();
