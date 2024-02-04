const fs = require('fs-extra');
const fileManipulation = require('../utils/fileManipulation');
const { getDateAsStringAsDDMMYYYY, getHoursIn24WithMinutesAndSeconds } = require('../utils/date');

jest.mock('fs-extra');

describe('Comprobaciones comunes entre funciones', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const funcionesInicializacion = [fileManipulation.initLogDir, fileManipulation.initConfigFile];

  funcionesInicializacion.forEach((funcionATestear) => {
    it(`${funcionATestear.name}, llamará a las funciones ensure de fs-extra`, () => {
      const spyOnEnsureDir = jest.spyOn(fs, 'ensureDirSync');
      const spyOnEnsureFile = jest.spyOn(fs, 'ensureFileSync');
      funcionATestear();
      expect(spyOnEnsureDir).toHaveBeenCalledTimes(1);
      expect(spyOnEnsureFile).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Genera un archivo de configuración', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const configMinProps = { NAME: 'Nombre del servidor' };
  it('Si se determina que el archivo no es válido, escribe el archivo', () => {
    const spyOnWriteFile = jest.spyOn(fs, 'writeFileSync');
    fs.readFileSync = jest.fn().mockReturnValue('');
    fileManipulation.initConfigFile();
    expect(spyOnWriteFile).toHaveBeenCalledTimes(1);
  });
  it('Si se determina que el archivo es válido, no escribe el archivo', () => {
    const spyOnWriteFile = jest.spyOn(fs, 'writeFileSync');
    fs.readFileSync = jest.fn().mockReturnValue(JSON.stringify(configMinProps));
    fileManipulation.initConfigFile();
    expect(spyOnWriteFile).toHaveBeenCalledTimes(0);
  });
});

describe('Genera archivos de logs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const contentToAdd = 'Texto para probar';
  it('Al generar un archivo de log, este contiene la fecha en formato DDMMYYY', () => {
    const nowDate = getDateAsStringAsDDMMYYYY();
    const spyOnEnsureFile = jest.spyOn(fs, 'ensureFileSync');
    fs.readFileSync = jest.fn().mockReturnValue('');
    fileManipulation.appendLog();
    expect(spyOnEnsureFile).toHaveBeenCalledWith(expect.stringContaining(nowDate));
  });
  it('Al agregar texto al log, este llama a appendFileSync con el contenido a agregar', () => {
    const spyOnWriteFile = jest.spyOn(fs, 'appendFileSync');

    fileManipulation.appendLog(contentToAdd);
    expect(spyOnWriteFile).toHaveBeenCalledTimes(1);
  });
  it('Al agregar texto al log, el comienzo de la línea debe tener la hora en formato 24, minutos y segundos', () => {
    const spyOnWriteFile = jest.spyOn(fs, 'appendFileSync');

    fileManipulation.appendLog(contentToAdd);
    expect(spyOnWriteFile).toHaveBeenCalledWith(expect.anything(), expect.stringMatching(new RegExp(`^${getHoursIn24WithMinutesAndSeconds()}`)), expect.anything());
  });
});
