/* eslint-disable no-plusplus */
const genPassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const passwordLength = 12;
  let pass = "";
  for (let i = 0; i <= passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    pass += chars.substring(randomNumber, randomNumber + 1);
  }

  return pass;
};

module.exports = { genPassword };
