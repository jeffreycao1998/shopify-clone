import { hashPassword, signToken } from '../util';
import { getUserByEmail, getStoreByName, createUser, createStore } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  email: string
  password: string
  storeName: string
}

const userRegister = async (obj: {}, args: Args, context: ContextType) => {
  const { email, password, storeName } = args;
  
  const user = await getUserByEmail(email);
  const store = await getStoreByName(storeName);
  
  if (user) {
    throw new Error('Email already registered');
  } else if (store) {
    throw new Error('Store name in use');

  } else {
    let userId = '';
    const hash = hashPassword(password);

    // Create User
    const newUser = await createUser(email, hash);
    userId = newUser.dataValues.id;

    // Create Store
    await createStore(storeName, userId);

  //   // Create Token
    const token = await signToken({ userId });
    
    return { token };
  }
};

export default userRegister;