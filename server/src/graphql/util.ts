import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenData } from '../types';

const hashPassword = (password: string) => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const signToken = async (tokenData: TokenData) => {
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string);
  return token;
};

export {
  hashPassword,
  signToken,
}