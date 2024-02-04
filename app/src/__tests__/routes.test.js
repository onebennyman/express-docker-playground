const request = require('supertest');
const app = require('../app');

describe('Confirma que las rutas establecidas están operativas', () => {
  it('La raíz retorna 200', async () => request(app)
    .get('/')
    .expect(200));
});