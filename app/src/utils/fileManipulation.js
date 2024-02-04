const fs = require('fs-extra');
const { getDateAsStringAsDDMMYYYY, getHoursIn24WithMinutesAndSeconds } = require('./date');
const { breakContainer } = require('./breaker');

const mainDir = process.env.MAINDIR || 'data';
const initConfigFileName = process.env.CONFIGFILENAME || 'config.json';
const initLogDirName = process.env.LOGDIRNAME || 'logs';
const minConfig = { NAME: process.env.NAME || 'DefaultName', totalHitsTaken: 0, sessionHitsTaken: 0 };
const maxHitsPerSession = parseInt(process.env.MAXHITSPERSESSION || '0', 10);

const checkOrCreateMainFolder = () => fs.ensureDirSync(mainDir);
const checkOrCreateFolder = (folderName) => fs.ensureDirSync(`${mainDir}/${folderName}`);
const checkOrCreateFile = (fileName) => fs.ensureFileSync(`${mainDir}/${fileName}`);
const readFile = (fileName) => fs.readFileSync(`${mainDir}/${fileName}`, { encoding: 'utf8' });
const readJSONFileReturnObject = (fileName) => {
  const fileContents = readFile(fileName);
  try {
    return JSON.parse(fileContents);
  } catch {
    return null;
  }
};
const writeFile = (fileName, fileContent) => fs.writeFileSync(`${mainDir}/${fileName}`, fileContent);
const writeObjectInFile = (fileName, object) => {
  try {
    const stringifiedObject = JSON.stringify(object);
    writeFile(fileName, stringifiedObject);
    return true;
  } catch {
    return false;
  }
};
const getPathFor = (folder) => {
  switch (folder) {
    case 'logs': return `${mainDir}/${initLogDirName}`;
    case 'main': return `${mainDir}`;
    default: return `${mainDir}/${folder}`;
  }
};

const checkOrCreateMinConfig = () => {
  const fileConfig = readJSONFileReturnObject(initConfigFileName);
  if (fileConfig === null) return writeObjectInFile(initConfigFileName, minConfig);
  return true;
};

const initLogDir = () => {
  checkOrCreateMainFolder();
  checkOrCreateFolder(initLogDirName);
};

const initConfigFile = () => {
  checkOrCreateMainFolder();
  checkOrCreateFile(initConfigFileName);
  checkOrCreateMinConfig();
};

const appendLog = (textToAdd) => {
  const logFilePath = getPathFor('logs');
  const fileName = getDateAsStringAsDDMMYYYY();
  const contentToAdd = `${getHoursIn24WithMinutesAndSeconds()} - ${textToAdd}\n`;
  fs.appendFileSync(`${logFilePath}/${fileName}`, contentToAdd, { encoding: 'utf8' });
};

const appendConfig = (dataObject = {}) => {
  let config = readJSONFileReturnObject(initConfigFileName);
  if (config === null) {
    initConfigFile();
    config = readJSONFileReturnObject(initConfigFileName);
  }

  if (dataObject.hit === true) {
    config.totalHitsTaken += 1;
    config.sessionHitsTaken += 1;
  }

  writeObjectInFile(initConfigFileName, config);
  if (config.sessionHitsTaken >= maxHitsPerSession) breakContainer();
  return true;
};

module.exports = {
  initLogDir, initConfigFile, appendLog, appendConfig,
};
