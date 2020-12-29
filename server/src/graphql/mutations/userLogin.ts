require('dotenv').config();
import bcrypt from 'bcrypt';
import { signToken } from '../util';
import { getUserByEmail } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  email: string
  password: string
}

const userLogin = async (obj: any, args: Args, context: ContextType) => {
  const { email, password } = args;
  const user = await getUserByEmail(email);

  if (!user) throw new Error('Incorrect credentials');

  const hash = user.dataValues.password;
  const correctPassword = await bcrypt.compare(password, hash);
  
  if (!correctPassword) {
    throw new Error('Incorrect credentials');
  } else {
    const token = await signToken({ userId: user.id });
    return { token };
  }
};

export default userLogin;