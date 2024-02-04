const fs = require('fs-extra');
const { getDateAsStringAsDDMMYYYY, getHoursIn24WithMinutesAndSeconds } = require('./date');

const mainDir = process.env.MAINDIR || 'data';
const initConfigFileName = process.env.CONFIGFILENAME || 'config.json';
const initLogDirName = process.env.LOGDIRNAME || 'logs';
const minConfig = { NAME: process.env.NAME || 'DefaultName' };

const checkOrCreateMainFolder = () => fs.ensureDirSync(mainDir);
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

const checkOrCreateMinConfig = () => {
  const fileConfig = readJSONFileReturnObject(initConfigFileName);
  if (fileConfig === null) return writeObjectInFile(initConfigFileName, minConfig);
  return true;
};

const initLogDir = () => {
  checkOrCreateMainFolder();
  checkOrCreateFile(initLogDirName);
};

const initConfigFile = () => {
  checkOrCreateMainFolder();
  checkOrCreateFile(initConfigFileName);
  checkOrCreateMinConfig();
};

const appendLog = (textToAdd) => {
  const fileName = getDateAsStringAsDDMMYYYY();
  checkOrCreateFile(fileName);
  const contentToAdd = `${getHoursIn24WithMinutesAndSeconds()} - ${textToAdd}`;

  fs.appendFileSync(fileName, contentToAdd, { encoding: 'utf8' });
};

module.exports = { initLogDir, initConfigFile, appendLog };
