import { getProductsByCollectionId } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  collectionId: number
}

const getProductsInCollection = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionId } = args;
  // getProductsByCollectionId(collectionId)
  // .then(data => console.log(data))
  // .catch(err => console.log(err));
  

  // return result;
};

export default getProductsInCollection;