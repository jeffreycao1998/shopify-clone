import { ContextType, ProductsCollection } from '../../../types';
import db from '../../../db/models';

type Args = {
  productIds: Array<number>
  collectionId: number
};

const addProductsToCollection = async (_obj: {}, args: Args, _context: ContextType) => {
  const { productIds, collectionId } = args;

  const productCollections = await db.ProductsCollection.findAll({ where: { collectionId }});
  //@ts-ignore
  const prevProductsIds = productCollections.map((productsCollection: ProductsCollection) => {
    return productsCollection.productId;
  });

  const newProductsToAdd = productIds.filter(productId => !prevProductsIds.includes(productId));

  if (newProductsToAdd.length === 0) {
    throw new Error('This collection already contains all selected products');
  }

  const newEntries = newProductsToAdd.map(productId => {
    return { productId, collectionId }
  });

  const result = await db.ProductsCollection.bulkCreate([...newEntries]);
  return { amount: result.length };
};

export default addProductsToCollection;