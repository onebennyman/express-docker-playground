const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.get('/', (req, res) => {
  res.send(`Hola desde ${process.env.NAME || 'UNDEFINED'}!`);
});

module.exports = app;
