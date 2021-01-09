import { hashPassword, signToken } from '../util';
import { ContextType } from '../../../types';
import db from '../../../db/models';

type Args = {
  email: string
  password: string
  storeName: string
}

const userRegister = async (_obj: {}, args: Args, _context: ContextType) => {
  const { email, password, storeName } = args;
  
  const user = await db.User.findOne({ where: { email }});
  const store = await db.Store.findOne({ 
    where: { endpoint: storeName.replace(/\s/g,'').toLowerCase() }
  });
  
  if (user) {
    throw new Error('Email already registered');
  } else if (store) {
    throw new Error('Store name in use');

  } else {
    let userId = '';
    const hash = hashPassword(password);

    // Create User
    const newUser = await db.User.build({
      email,
      password: hash
    });
    await newUser.save();
    //@ts-ignore
    userId = newUser.id;

    // Create Store
    const store = await db.Store.build({
      name: storeName,
      endpoint: storeName.replace(/\s/g,'').toLowerCase(),
      userId
    });
    await store.save();

    // Create Token
    const token = await signToken({ userId });
    
    return { token };
  }
};

export default userRegister;