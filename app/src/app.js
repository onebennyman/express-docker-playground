const express = require('express');
const {
  initConfigFile, initLogDir, appendLog, appendConfig,
} = require('./utils/fileManipulation');
const { startToFindAndAttack } = require('./utils/attack');

const target = `http://${process.env.TARGETURL || 'localhost'}:${process.env.TARGETPORT || '3000'}/api`;
const textToAppendOnLogWhenPosted = process.env.TEXTONPOST || 'Tocado desde:';
const app = express();

app.get('/', (req, res) => {
  res.send(`Hola desde ${process.env.NAME || 'UNDEFINED'}!`);
});

app.post('/api', (req, res) => {
  const ip = req.socket.remoteAddress;
  appendLog(`${textToAppendOnLogWhenPosted} ${ip}`);
  appendConfig({ hit: true });
  res.send().status(200);
});

app.get('/api', (req, res) => {
  res.send(process.env.NAME || 'UNDEFINED').status(200);
});

app.initAPI = () => {
  initConfigFile();
  initLogDir();
  startToFindAndAttack(target, 1, 3);
};

module.exports = app;
