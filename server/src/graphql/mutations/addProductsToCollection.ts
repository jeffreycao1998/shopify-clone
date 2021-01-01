import { any } from 'sequelize/types/lib/operators';
import { getProductsByCollectionId, addUsersProductsToCollection } from '../../db/helpers';
import { ImageType, CollectionType, ContextType } from '../../types';

type Args = {
  productIds: Array<number>
  collectionId: number
};

const addProductsToCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds, collectionId } = args;

  const prevCollections = await getProductsByCollectionId(collectionId);
  const productsInCollection = prevCollections.map((productCollection: any) => productCollection.dataValues.productId);
  const newProductsToAdd = productIds.filter(productId => !productsInCollection.includes(productId));

  if (newProductsToAdd.length === 0) {
    throw new Error('This collection already contains all selected products');
  }

  const result = await addUsersProductsToCollection(newProductsToAdd, collectionId)
  return { amount: result.length };
};

export default addProductsToCollection;