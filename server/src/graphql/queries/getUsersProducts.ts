import { getProductsByUserId } from '../../db/helpers';
import { ContextType } from '../../types';

const getUsersProducts = async (obj: any, args: any, context: ContextType) => {
  const userId = context.user.id;

  const result = await getProductsByUserId(userId)
  
  return result;
};

export default getUsersProducts;