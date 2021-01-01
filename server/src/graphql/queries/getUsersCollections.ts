import { ContextType } from '../../types';
import db from '../../db/models';

const getUsersCollections = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await db.Collection.findAll({ where: { userId }});

  // order by id
  result.sort((a: any, b: any) => a.dataValues.id - b.dataValues.id);

  return result;
};

export default getUsersCollections;