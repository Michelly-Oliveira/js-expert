const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const Fibonacci = require('./fibonacci.js');

(async () => {
	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);

		// generators return iterators (access with .next)
		// used for await to read the data from the iterator
		for await (const i of fibonacci.execute(3)) {
		}

		// Recursive call, the fourth time it's called is the exit criteria
		const expectedCallCount = 4;

		deepStrictEqual(spy.callCount, expectedCallCount);
	}

	{
		const fibonacci = new Fibonacci();
		const spy = sinon.spy(fibonacci, fibonacci.execute.name);

		const [...results] = fibonacci.execute(5);
		// [0] input = 5, current = 0, next = 1
		// [1] input = 4, current = 1, next = 1
		// [2] input = 3, current = 1, next = 2
		// [3] input = 2, current = 2, next = 3
		// [4] input = 1, current = 3, next = 5
		// [5] input = 0 exit criteria - stops the execution

		const { args } = spy.getCall(2);

		const expectedResult = [0, 1, 1, 2, 3];
		const expectedParams = Object.values({
			input: 3,
			current: 1,
			next: 2,
		});

		deepStrictEqual(args, expectedParams);
		deepStrictEqual(results, expectedResult);
	}
})();
