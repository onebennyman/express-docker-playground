const request = require('supertest');
const fs = require('fs-extra');
const app = require('../app');
const breaker = require('../utils/breaker');

jest.mock('fs-extra');
jest.mock('../utils/breaker');

const maxHitsPerSession = 3;

describe('Acciones POST sobre /api', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('Recibir una petición agregará una línea al log', async () => {
    const spyOnAppendFile = jest.spyOn(fs, 'appendFileSync');

    await request(app).post('/api');
    expect(spyOnAppendFile).toHaveBeenCalledTimes(1);
  });

  const hits = Array
    .from({ length: maxHitsPerSession - 1 })
    .map((v, i) => i + 1);

  hits.forEach((hit) => {
    it(`Recibir la petición ${hit} modificará la propiedad taken de la configuración a ${hit}`, async () => {
      const spyOnAppendFile = jest.spyOn(fs, 'writeFileSync');
      fs.readFileSync = jest.fn(() => `{"NAME":"TEST","totalHitsTaken":${hit - 1},"sessionHitsTaken":${hit - 1}}`);
      await request(app).post('/api');
      expect(spyOnAppendFile).toHaveBeenCalledWith(expect.anything(), expect.stringContaining(`"totalHitsTaken":${hit}`));
      expect(spyOnAppendFile).toHaveBeenCalledWith(expect.anything(), expect.stringContaining(`"sessionHitsTaken":${hit}`));
    });
  });

  it('Recibir la última petición petición del máximo de la sesión, llamará a la función break', async () => {
    const spyOnBreakContainer = jest.spyOn(breaker, 'breakContainer');
    fs.readFileSync = jest.fn(() => `{"NAME":"TEST","totalHitsTaken":${maxHitsPerSession},"sessionHitsTaken":${maxHitsPerSession}}`);
    await request(app).post('/api');
    expect(spyOnBreakContainer).toHaveBeenCalledTimes(1);
  });
});
