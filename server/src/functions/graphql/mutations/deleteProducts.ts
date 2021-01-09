import { ContextType } from '../../../types';
import db from '../../../db/models';

type Args = {
  productIds: Array<number>
}

const deleteProducts = async (_obj: {}, args: Args, _context: ContextType) => {
  const { productIds } = args;
  
  await db.Product.destroy({ where: { id: [...productIds] }});

  return { amount: productIds.length };
};

export default deleteProducts;