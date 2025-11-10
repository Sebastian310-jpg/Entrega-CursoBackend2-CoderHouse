import bcrypt from 'bcrypt';

const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
}

const validatePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
}

export { hashPassword, validatePassword };