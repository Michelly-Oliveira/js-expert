const { expect } = require('chai');
const sinon = require('sinon');
const { describe, it, before, beforeEach, afterEach } = require('mocha');

const CarService = require('../../src/service/carService');

const mocks = {
	validCarCategory: require('../mocks/valid-carCategory.json'),
	validCar: require('../mocks/valid-car.json'),
	validcustomer: require('../mocks/valid-customer.json'),
};

describe('CarService Suite Tests', () => {
	let carService = {};
	let sandbox = {};

	before(() => {
		carService = new CarService({
			cars: {},
		});
	});

	beforeEach(() => {
		// before each test, create a 'clean' sinon
		sandbox = sinon.createSandbox();
	});

	afterEach(() => {
		// remove any modified stubs, mocks etc
		sandbox.restore();
	});

	it('should retrieve a random position from an array', async () => {
		const data = [0, 1, 2, 3, 4];

		const result = carService.getRandomPositionFromArray(data);

		expect(result).to.be.lt(data.length).gte(0);
	});

	it('should choose the first id from carIds in carCategory', async () => {
		const carCategory = mocks.validCarCategory;
		const carIdIndex = 0;
		const expectedCarId = carCategory.carIds[carIdIndex];

		// under the hood, the stubs also an spy
		sandbox.stub(carService, carService.getRandomPositionFromArray.name).returns(carIdIndex);

		const result = carService.chooseRandomCar(carCategory);

		expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
		expect(result).to.be.equal(expectedCarId);
	});

	it('should return an available car given a carCategory', async () => {
		const carCategory = Object.create(mocks.validCarCategory);
		const expectedCar = mocks.validCar;
		carCategory.carIds = [expectedCar.id];

		sandbox.stub(carService.carRepository, carService.carRepository.find.name).returns(expectedCar);
		sandbox.spy(carService, carService.chooseRandomCar.name);

		const result = await carService.getAvailableCar(carCategory);

		expect(carService.chooseRandomCar.calledOnce).to.be.ok;
		expect(carService.carRepository.find.calledWithExactly(expectedCar.id)).to.be.ok;
		expect(result).to.be.deep.equal(expectedCar);
	});
});
