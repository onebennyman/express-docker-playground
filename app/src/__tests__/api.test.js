const request = require('supertest');
const fs = require('fs-extra');
const app = require('../app');

jest.mock('fs-extra');

describe('Acciones POST sobre /api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Recibir una petición agregará una línea al log', async () => {
    const spyOnAppendFile = jest.spyOn(fs, 'appendFileSync');

    await request(app).post('/api');
    expect(spyOnAppendFile).toHaveBeenCalledTimes(1);
  });
});
