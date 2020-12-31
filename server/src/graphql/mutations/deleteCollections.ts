import { deleteUsersCollections } from '../../db/helpers';
import { ContextType } from '../../types';

type Args = {
  collectionIds: Array<number>
}

const deleteCollections = async (obj: {}, args: Args, context: ContextType) => {
  const { collectionIds } = args;
  
  await deleteUsersCollections(collectionIds);

  return { amount: collectionIds.length };
};

export default deleteCollections;