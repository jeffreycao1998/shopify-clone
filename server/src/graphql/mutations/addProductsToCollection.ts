import { getCollectionsByUserId, createCollection, addProductToCollection } from '../../db/helpers';
import { ImageType, CollectionType, ContextType } from '../../types';

type Args = {
  productIds: Array<number>
  collectionId: number
};

const addProductsToCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds, collectionId } = args;
  // console.log(collectionId);
  productIds.forEach(async (productId) => {
    await addProductToCollection(productId, collectionId);
  });

  return { success: true };
};

export default addProductsToCollection;