import { ContextType } from '../../types';
import { 
  getStoreByEndpoint,
  getActiveCollectionByUserId,
  getProductsByCollectionId
} from '../../db/helpers';

type Args = {
  storeEndpoint: string
};

const getStoreProducts = async (obj: {}, args: Args, context: ContextType) => {
  const { storeEndpoint } = args;

  const store = await getStoreByEndpoint(storeEndpoint)
  const collection = await getActiveCollectionByUserId(store.userId);
  const activeCollection = await getProductsByCollectionId(collection.id);
  
  return activeCollection.dataValues.products;
};

export default getStoreProducts;