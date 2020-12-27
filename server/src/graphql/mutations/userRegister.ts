
import db from '../../db';
import { hashPassword, signToken } from '../util';
import { getUserByEmail, getStoreByName, createUser, createStore } from '../../db/helpers';

const userRegister = async (obj: any, args: any, context: any, info: any) => {
  const { email, password, storeName } = args;
  const users = (await getUserByEmail(email)).rows;
  const stores = (await getStoreByName(storeName)).rows;
  
  if (users.length) {
    throw new Error('Email already registered');
  } else if (stores.length) {
    throw new Error('Store name in use');

  } else {
    let userId = '';
    const hash = hashPassword(password);

    // Create User
    await createUser(email, hash)
    .then(user => { userId = user.rows[0].id })
    .catch(e => { throw new Error(e.message) });

    // Create Store
    await createStore(storeName, userId)
    .catch(e => { throw new Error(e.message) });

    // Create Token
    const token = signToken({ userId });

    return { token };
  }
};

export default userRegister;