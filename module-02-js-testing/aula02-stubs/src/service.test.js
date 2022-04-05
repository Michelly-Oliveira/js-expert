const sinon = require('sinon');
const { deepStrictEqual } = require('assert');

const Service = require('./service.js');

const BASE_URL_1 = 'https://swapi.dev/api/planets/1/';
const BASE_URL_2 = 'https://swapi.dev/api/planets/2/';
const mocks = {
	tatooine: require('./mocks/tatooine.json'),
	alderaan: require('./mocks/alderaan.json'),
};

(async () => {
	// calls real API
	// const service = new Service();
	// const response = await service.makeRequest(BASE_URL_2);
	// console.log(JSON.stringify(response));

	const service = new Service();
	// replace function implementation
	const stub = sinon.stub(service, service.makeRequest.name);

	// when the function is called with these arguments, it returns the specified object
	stub.withArgs(BASE_URL_1).resolves(mocks.tatooine);

	stub.withArgs(BASE_URL_2).resolves(mocks.alderaan);

	{
		const expected = {
			name: 'Tatooine',
			surfaceWater: '1',
			appearedIn: 5,
		};

		const response = await service.getPlanets(BASE_URL_1);

		deepStrictEqual(response, expected);
	}

	{
		const expected = {
			name: 'Alderaan',
			surfaceWater: '40',
			appearedIn: 2,
		};

		const response = await service.getPlanets(BASE_URL_2);

		deepStrictEqual(response, expected);
	}
})();
