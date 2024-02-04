const express = require('express');
const dotenv = require('dotenv');
const { initConfigFile, initLogDir, appendLog } = require('./utils/fileManipulation');

dotenv.config();
const textToAppendOnLogWhenPosted = process.env.TEXTONPOST || 'Tocado desde:';
const app = express();

app.get('/', (req, res) => {
  res.send(`Hola desde ${process.env.NAME || 'UNDEFINED'}!`);
});

app.post('/api', (req, res) => {
  const ip = req.socket.remoteAddress;
  appendLog(`${textToAppendOnLogWhenPosted} ${ip}`);
  res.send().status(200);
});

app.initAPI = () => {
  initConfigFile();
  initLogDir();
};

module.exports = app;
