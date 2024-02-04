const app = require('./app');
const { logDecoratedText } = require('./utils/logDecorator');

const port = process.env.SERVER_PORT || 3000;

app.listen(port, async () => {
  logDecoratedText(`Escuchando por el puerto ${port}`, '*');
});
