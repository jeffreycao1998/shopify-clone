import { deleteUsersProducts } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  productIds: Array<number>
}

const deleteProducts = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds } = args;
  
  await deleteUsersProducts(productIds);

  return { amount: productIds.length };
};

export default deleteProducts;