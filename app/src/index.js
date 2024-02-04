const dotenv = require('dotenv');

dotenv.config();

const app = require('./app');
const { logDecoratedText } = require('./utils/logDecorator');

const port = process.env.SERVERPORT || 3000;

app.initAPI();

app.listen(port, async () => {
  logDecoratedText(`Escuchando por el puerto ${port}`, '*');
});
