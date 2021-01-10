import jwt from 'jsonwebtoken';
import { TokenDataType } from '../../types';

const signToken = async (tokenData: TokenDataType) => {
  const token = await jwt.sign(tokenData, process.env.JWT_SECRET as string);
  return token;
};

export default signToken;