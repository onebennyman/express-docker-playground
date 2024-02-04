const app = require('../app');
const fileManipulation = require('../utils/fileManipulation');

jest.mock('../utils/fileManipulation');

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
