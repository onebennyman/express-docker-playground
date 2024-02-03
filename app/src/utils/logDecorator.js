const generateTextDecorated = (middleText, decorator) => {
  const text = `${decorator} ${middleText} ${decorator}`;
  const repeatedDecorator = decorator.repeat(text.length);

  return `
      ${repeatedDecorator}
      ${text}
      ${repeatedDecorator}
      `;
};

const logDecoratedText = (text, decorator = '*') => {
  // eslint-disable-next-line no-console
  console.log(generateTextDecorated(text, decorator));
};

module.exports = { generateTextDecorated, logDecoratedText };
