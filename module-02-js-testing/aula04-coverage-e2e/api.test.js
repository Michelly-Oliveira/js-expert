const { describe, it } = require('mocha');
const assert = require('assert');
const request = require('supertest');

const app = require('./api.js');

describe('API Suite Test', () => {
	describe('/contact', () => {
		it('should request the contact page and return HTTP Status 200', async () => {
			const response = await request(app).get('/contact').expect(200);

			assert.deepStrictEqual(response.text, 'Contact Us page');
		});
	});

	describe('/hello', () => {
		it('should request an inexistent route /hi and redirect to /hello', async () => {
			const response = await request(app).get('/hi').expect(200);

			assert.deepStrictEqual(response.text, 'Hello World');
		});
	});

	describe('/login', () => {
		it('should login successfully on login route and return HTTP Status 200', async () => {
			const response = await request(app)
				.post('/login')
				.send({ username: 'Michelly', password: '123' })
				.expect(200);

			assert.deepStrictEqual(response.text, 'Login succeeded');
		});

		it('should fail at login on login route and return HTTP Status 401', async () => {
			const response = await request(app)
				.post('/login')
				.send({ username: 'Error', password: '123' })
				.expect(401);

			// .ok -> validate boolean
			assert.ok(response.unauthorized);
			assert.deepStrictEqual(response.text, 'Login failed');
		});
	});
});
