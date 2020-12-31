import { any } from 'sequelize/types/lib/operators';
import { getProductsByCollectionId, addProductToCollection } from '../../db/helpers';
import { ImageType, CollectionType, ContextType } from '../../types';

type Args = {
  productIds: Array<number>
  collectionId: number
};

const addProductsToCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { productIds, collectionId } = args;

  const result = await getProductsByCollectionId(collectionId);
  const productsInCollection = result.map((productCollection: any) => productCollection.dataValues.productId);
  const newProductsToAdd = productIds.filter(productId => !productsInCollection.includes(productId));
  console.log(productsInCollection, newProductsToAdd);

  if (newProductsToAdd.length === 0) {
    throw new Error('This collection already contains all selected products');
  } else {
    productIds.forEach(async (productId) => {
      await addProductToCollection(productId, collectionId);
    });
  };

  return { productsAdded: newProductsToAdd };
};

export default addProductsToCollection;