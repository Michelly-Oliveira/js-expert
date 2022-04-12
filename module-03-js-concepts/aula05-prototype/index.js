const { deepStrictEqual } = require('assert');

const obj = {};
const array = [];
const func = () => {};

// internally, object literals are explicit functions
// object literal: obj = {}
// explicit function: Object()
console.log('new Object() is {}?', new Object().__proto__ === {}.__proto__);
deepStrictEqual(new Object().__proto__, {}.__proto__);

// __proto__
console.log('obj.__proto__ === Object.prototype', obj.__proto__ === Object.prototype);
deepStrictEqual(obj.__proto__, Object.prototype);

console.log('array.__proto__ === Array.prototype', array.__proto__ === Array.prototype);
deepStrictEqual(array.__proto__, Array.prototype);

console.log('func.__proto__ === Function.prototype', func.__proto__ === Function.prototype);
deepStrictEqual(func.__proto__, Function.prototype);

// __proto__ of Object.protory is null
// in the end, everything in js inherits from null
// obj.__proto__.__proto__ = Object.__proto__
console.log('obj.__proto__.__proto__ === null', obj.__proto__.__proto__ === null);
deepStrictEqual(obj.__proto__.__proto__, null);

// -------------------------------------------------------------------------------------------
console.log('---------------');

function Employee() {}
Employee.prototype.salary = () => 'salary**';

function Supervisor() {}
// Supervisor inherits from Employee -> same base functionality
// Object.create -> create a new object from the Employee.prototype, so that the Supervisor
// is not affected by any change in the Employee later on
Supervisor.prototype = Object.create(Employee.prototype);
Supervisor.prototype.profitShare = () => 'profitShare**';

function Manager() {}
Manager.prototype = Object.create(Supervisor.prototype);
Manager.prototype.monthlyBonus = () => 'monthlyBonus**';

// We can access an inherited prop/method through the protoyype, using .protoype.prop
console.log('Manager.prototype.salary()', Manager.prototype.salary());
// but we can't access that same prop/method through the protoyype, without using .protoype
// console.log('Manager.salary()', Manager.salary());

// if we don't call with 'new', the frist __proto__ is always an intance of the explicit
// function of the parent (in this case, Function, because our classes were created
// as functions), it doesn't inrehit from our classes
// But we can access the classes with inrehitance using .prototype
console.log(
	'Manager.prototype.__proto__ === Supervisor.prototype',
	Manager.prototype.__proto__ === Supervisor.prototype
);
deepStrictEqual(Manager.prototype.__proto__, Supervisor.prototype);

// prototype => where methods/props are kept ('object itself')
// __proto__ => reference used in the lookup chain, reference to the 'parent'
// Manager.prototype = Manager props/methods
// Manager.prototype.__proto__ = Manager's parent = Supervisor.prototype = Supervisor

console.log('---------------');

// when we call with 'new', the __proto__ receives the protoype
console.log(
	'manager.__proto__: %s, manager.salary: %s',
	new Manager().__proto__,
	new Manager().salary()
);
console.log(
	'new Manager().__proto__.__proto__ === Supervisor.prototype',
	new Manager().__proto__.__proto__ === Supervisor.prototype
);
deepStrictEqual(new Manager().__proto__.__proto__, Supervisor.prototype);

console.log('---------------');

const manager = new Manager();
// manager inherits from Supervisor, which in turn inherits from Employee
console.log('manager.salary()', manager.salary());
console.log('manager.profitShare()', manager.profitShare());
console.log('manager.monthlyBonus()', manager.monthlyBonus());

console.log('---------------');

console.log('Inheritance chain');
console.log('Manager prototype', manager.__proto__);
console.log('Supervisor prototype', manager.__proto__.__proto__);
console.log('Employee prototype', manager.__proto__.__proto__.__proto__);
console.log('Object prototype', manager.__proto__.__proto__.__proto__.__proto__);
console.log('null', manager.__proto__.__proto__.__proto__.__proto__.__proto__);

deepStrictEqual(manager.__proto__, Manager.prototype);
deepStrictEqual(manager.__proto__.__proto__, Supervisor.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__, Employee.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(manager.__proto__.__proto__.__proto__.__proto__.__proto__, null);

console.log('---------------');

class T1 {
	ping() {
		return 'ping';
	}
}

class T2 extends T1 {
	pong() {
		return 'pong';
	}
}

class T3 extends T2 {
	shoot() {
		return 'shoot';
	}
}

const t3 = new T3();
console.log('t3 inherits null?', t3.__proto__.__proto__.__proto__.__proto__.__proto__ === null);
console.log('t3.ping()', t3.ping());
console.log('t3.pong()', t3.pong());
console.log('t3.shoot()', t3.shoot());

deepStrictEqual(t3.__proto__, T3.prototype);
deepStrictEqual(t3.__proto__.__proto__, T2.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__, T1.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__, Object.prototype);
deepStrictEqual(t3.__proto__.__proto__.__proto__.__proto__.__proto__, null);
