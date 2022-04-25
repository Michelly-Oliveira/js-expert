import mocha from 'mocha';
import chai from 'chai';

import Person from '../src/person.js';

const { describe, it } = mocha;
const { expect } = chai;

describe('Person Test Suite', () => {
	it('should return a person instance from a string', async () => {
		const person = Person.generateInstanceFromText('2 Motocicleta,Carro 500 2009-01-01 2020-11-26');

		const expectedResult = {
			id: '2',
			vehicles: ['Motocicleta', 'Carro'],
			kmTraveled: '500',
			from: '2009-01-01',
			to: '2020-11-26',
		};

		expect(person).to.be.deep.equal(expectedResult);
	});

	it('should format the values', async () => {
		const person = new Person({
			id: '2',
			vehicles: ['Motocicleta', 'Carro'],
			kmTraveled: '500',
			from: '2009-01-01',
			to: '2020-11-26',
		});
		const formattedPerson = person.formatted('pt-BR');

		const expectedResult = {
			id: 2,
			vehicles: 'Motocicleta e Carro',
			kmTraveled: '500 km',
			from: '01 de janeiro de 2009',
			to: '26 de novembro de 2020',
		};

		expect(formattedPerson).to.be.deep.equal(expectedResult);
	});
});
