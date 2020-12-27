require('dotenv').config();
import bcrypt from 'bcrypt';
import { signToken } from '../util';
import { getUserByEmail } from '../../db/helpers';

const userLogin = async (obj: any, args: any, context: any, info: any) => {
  const { email, password } = args;
  const user = (await getUserByEmail(email)).rows[0];
  
  const hash = user.password;
  const correctPassword = await bcrypt.compare(password, hash);
  
  if (!user || !correctPassword) {
    throw new Error('Incorrect credentials');
  } else {
    const token = signToken({ userId: user.id });
    return { token };
  }
};

export default userLogin;