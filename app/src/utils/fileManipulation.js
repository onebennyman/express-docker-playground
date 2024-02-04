const fs = require('fs-extra');
const { getDateAsStringAsDDMMYYYY, getHoursIn24WithMinutesAndSeconds } = require('./date');

const mainDir = process.env.MAINDIR || 'data';
const initConfigFileName = process.env.CONFIGFILENAME || 'config.json';
const initLogDirName = process.env.LOGDIRNAME || 'logs';
const minConfig = { NAME: process.env.NAME || 'DefaultName' };

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
  checkOrCreateFile(`${logFilePath}/${fileName}`);
  const contentToAdd = `${getHoursIn24WithMinutesAndSeconds()} - ${textToAdd}\n`;
  fs.appendFileSync(`${logFilePath}/${fileName}`, contentToAdd, { encoding: 'utf8' });
};

module.exports = { initLogDir, initConfigFile, appendLog };
