const app = require('../app');
const fileManipulation = require('../utils/fileManipulation');
const attack = require('../utils/attack');

jest.mock('../utils/fileManipulation');
jest.mock('../utils/attack');

describe('Al iniciar la API, inicializa el data', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Inicia la API e inicializa', async () => {
    const spyOnInitLog = jest.spyOn(fileManipulation, 'initLogDir');
    const spyOnInitConfig = jest.spyOn(fileManipulation, 'initConfigFile');

    app.initAPI();
    expect(spyOnInitLog).toHaveBeenCalledTimes(1);
    expect(spyOnInitConfig).toHaveBeenCalledTimes(1);
  });
});

describe('Al iniciar la API empieza a buscar a un atacante', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Inicia la API y busca atacante', async () => {
    const spyOnStartFinding = jest.spyOn(attack, 'startToFindAndAttack');
    app.initAPI();
    expect(spyOnStartFinding).toHaveBeenCalledTimes(1);
  });
});
