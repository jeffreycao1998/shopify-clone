require('dotenv').config();
import * as bcrypt from 'bcrypt';
import { signToken } from '../util';
import { ContextType } from '../../../types';
import db from '../../../db/models';

type Args = {
  email: string
  password: string
}

const userLogin = async (_obj: {}, args: Args, _context: ContextType) => {
  const { email, password } = args;
  const user = await db.User.findOne({ where: { email }});

  if (!user) throw new Error('Incorrect credentials');

  //@ts-ignore
  const hash = user.password;
  const correctPassword = await bcrypt.compare(password, hash);
  
  if (!correctPassword) {
    throw new Error('Incorrect credentials');
  } else {
    //@ts-ignore
    const token = await signToken({ userId: user.id });
    return { token };
  }
};

export default userLogin;