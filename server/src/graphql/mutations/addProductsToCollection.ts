import { ContextType } from '../../types';
import db from '../../db/models';

type Args = {
  productIds: Array<number>
  collectionId: number
};

const addProductsToCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds, collectionId } = args;

  const productCollections = await db.ProductsCollection.findAll({ where: { collectionId }});
  const prevProductsIds = productCollections.map((product: any) => product.productId);

  const newProductsToAdd = productIds.filter(productId => !prevProductsIds.includes(productId));

  if (newProductsToAdd.length === 0) {
    throw new Error('This collection already contains all selected products');
  }

  const newEntries = productIds.map(productId => {
    return { productId, collectionId }
  });
  const result = await db.ProductsCollection.bulkCreate([...newEntries])

  return { amount: result.length };
};

export default addProductsToCollection;