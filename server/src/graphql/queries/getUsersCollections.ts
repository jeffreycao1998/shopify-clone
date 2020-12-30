import { getCollectionsByUserId } from '../../db/helpers';
import { ContextType } from '../../types';

const getUsersCollections = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await getCollectionsByUserId(userId)
  return result;
};

export default getUsersCollections;