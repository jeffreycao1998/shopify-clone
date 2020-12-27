import jwt from 'jsonwebtoken';
import db from '../db';
import bcrypt from 'bcrypt';

const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

type TokenData = {
  userId: string
}

const signToken = async (tokenData: TokenData) => {
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string);
  return token;
};

export {
  hashPassword,
  signToken,
}