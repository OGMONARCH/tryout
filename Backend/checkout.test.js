const request = require('supertest');
const app = require('./index'); // Assuming your Express app is exported from app.js

describe('POST /checkout', () => {
  it('should create a new order and return clientSecret', async () => {
    const response = await request(app)
      .post('/checkout')
      .send({
        name: 'John Doe',
        email: 'john@example.com',
        address: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        paymentMethodId: 'pm_test',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('clientSecret');
  });
});
