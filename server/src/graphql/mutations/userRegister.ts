import db from '../../db';

const getUserByEmail = async (email: string) => {
  const result = await db.query(`
    SELECT * FROM users
    WHERE email=$1;
  `, [email]);

  return result.rows;
};

const getStoresByName = async (storeName: string) => {
  const result = await db.query(`
    SELECT * FROM stores
    WHERE name=$1;
  `, [storeName]);
  
  return result.rows;
};

const userRegister = async (obj: any, args: any, context: any, info: any) => {
  const { email, password, storeName } = args;
  const users = await getUserByEmail(email);
  const stores = await getStoresByName(storeName);
  
  if (users.length) {
    throw new Error('Email already registered');
  } else if (stores.length) {
    throw new Error('Store name in use');

  } else {
    let userId;

    // Create User
    await db.query(`
      INSERT INTO users (email, password)
      VALUES ($1, $2)
      RETURNING *;
    `, [email, password])
    .then(user => {
      userId = user.rows[0].id;
    })
    .catch(e => {
      throw new Error(e.message)
    });

    // Create Store
    await db.query(`
      INSERT INTO stores (name, user_id)
      VALUES ($1, $2);
    `, [storeName, userId])
    .catch(e => {
      throw new Error(e.message)
    });

    return { success: true }
  }
};

export default userRegister;