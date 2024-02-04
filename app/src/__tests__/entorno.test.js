const request = require('supertest');
const app = require('../app');

describe('Confirma el uso de las variables de entorno', () => {
  it('La raíz retorna NAME', async () => {
    const response = await request(app).get('/');
    expect(response.text).toContain(process.env.NAME);
  });
});
