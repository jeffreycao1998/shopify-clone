import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  productIds: Array<number>
}

const deleteProducts = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds } = args;
  
  await db.Product.destroy({ where: { id: [...productIds] }});

  return { amount: productIds.length };
};

export default deleteProducts;