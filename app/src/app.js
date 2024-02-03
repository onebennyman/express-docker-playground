const express = require('express');
const dotenv = require('dotenv');
const { logDecoratedText } = require('./utils/logDecorator');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`Hola desde ${process.env.NAME || 'UNDEFINED'}!`);
});

app.listen(port, () => {
  logDecoratedText(`Escuchando por el puerto ${port}`, '*');
});
