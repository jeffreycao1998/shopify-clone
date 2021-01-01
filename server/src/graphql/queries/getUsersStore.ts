import { getStoreByUserId } from '../../db/helpers';
import { ContextType } from '../../types';

const getUsersStoreName = async (obj: {}, args: {}, context: ContextType) => {
  const userId = context.user.id;

  const result = await getStoreByUserId(userId)
  return result;
};

export default getUsersStoreName;