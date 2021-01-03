import { ContextType, CollectionType } from '../../types';
import db from '../../db/models';

const getUsersCollections = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await db.Collection.findAll({ 
    where: { userId },
    order: [
      ['id', 'DESC']  // most recent first -> least recent last
    ]
    });

  return result;
};

export default getUsersCollections;