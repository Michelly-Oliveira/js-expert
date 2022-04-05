// Fibonacci:
// given a number, the result is the sum of the previous numbers
// ex: 3 -> 0 1 1
// ex: 5 -> 0 1 1 2 3
class Fibancci {
	// generator
	*execute(input, current = 0, next = 1) {
		if (input === 0) {
			return 0;
		}

		// yield = returns the value
		yield current;

		// delegates a function, but it doesn't return the value (call the function)
		yield* this.execute(input - 1, next, current + next);
	}
}

module.exports = Fibancci;
