'use strict';

const {
	watch,
	promises: { readFile },
} = require('fs');

class File {
	watch(event, filename) {
		console.log('this', this);
		console.log('arguments', Array.prototype.slice.call(arguments));

		this.showContent(filename);
	}

	async showContent(filename) {
		console.log((await readFile(filename)).toString());
	}
}

// watch(__filename, async (event, filename) => {
//     console.log((await readFile(filename)).toString())
// })

const file = new File();

// like this, the file 'this' is ignored
// inherits the 'this' from the watch
// watch(__filename, file.watch)

// Ways to use the 'this' from the file class (not from the watch function)
// arrow function
// watch(__filename, (event, filename) => file.watch(event, filename))

// We can define explicitly the 'this' to be used
// .bind() returns a function with the passed object as its 'this' context
watch(__filename, file.watch.bind(file));

// .apply and .call -> explcitly define the 'this' context to be used
// .apply: receives an object as the first param (this), and a list of arguments
// .call: receives an object as the first param (this), and an array with the arguments
file.watch.call({ showContent: () => console.log('call: hey sinon!') }, null, __filename);
file.watch.apply({ showContent: () => console.log('apply: hey sinon!') }, [null, __filename]);
