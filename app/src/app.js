const express = require('express');
const {
  initConfigFile, initLogDir, appendLog, appendConfig,
} = require('./utils/fileManipulation');

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

app.initAPI = () => {
  initConfigFile();
  initLogDir();
};

module.exports = app;
