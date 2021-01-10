import { ContextType } from '../../types';
import db from '../../db/models';

const getUser = async (_obj: {}, _args: {}, context: ContextType) => {
  const userId = context.user.id;

  const user = await db.User.findOne({ where: { id: userId }});

  //@ts-ignore
  delete user.password;

  return user;
};

export default getUser;