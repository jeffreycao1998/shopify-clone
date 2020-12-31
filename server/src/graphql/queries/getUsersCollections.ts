import { getCollectionsByUserId } from '../../db/helpers';
import { ContextType } from '../../types';

const getUsersCollections = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await getCollectionsByUserId(userId)

  // order by id
  result.sort((a: any, b: any) => a.dataValues.id - b.dataValues.id);

  return result;
};

export default getUsersCollections;