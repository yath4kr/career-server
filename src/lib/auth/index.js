const bcrypt = require("bcrypt");

const { SALT_ROUND } = require("../../constants");

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUND);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  comparePassword,
  hashPassword,
};
