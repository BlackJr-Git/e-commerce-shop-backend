const bcrypt = require("bcrypt");
const saltRounds = 10;

async function hashPassword(password) {
  const hash = bcrypt.hashSync(password, saltRounds);
  return hash;
}

async function comparePassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
};
